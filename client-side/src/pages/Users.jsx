import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import CustomDrawer from "../components/CustomDrawer";
import CustomIconButton from "../components/CustomIconButton";
import CustomMenuFilter from "../components/CustomMenuFilter";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import RenderFormField from "../components/RenderFormField";
import { useUsers } from "../hooks/useUsers";
import { deleteUser } from "../store/user/action";
import { showToast } from "../utils/toastUtils";
const userUpdateFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter user name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      {
        label: "admin",
        value: "admin",
      },
      {
        label: "trainer",
        value: "trainer",
      },
      {
        label: "client",
        value: "client",
      },
    ],
  },
  {
    type: "button",
    text: "Update User",
  },
];
const userFields = [
  {
    name: "fullName",
    label: "fullName",
    type: "text",
    placeholder: "Enter user name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      {
        label: "admin",
        value: "admin",
      },
      {
        label: "client",
        value: "client",
      },
      {
        label: "trainer",
        value: "trainer",
      },
    ],
  },
  {
    type: "button",
    text: "Create User",
  },
];

const Users = () => {
  const {
    loading,
    drawerOpen,
    openDrawer,
    closeDrawer,
    drawerUpdateOpen,
    openUpdateDrawer,
    closeUpdateDrawer,
    onSubmit,
    control,
    handleSubmit,
    errors,
    reset,
    updateControl,
    handleUpdateSubmit,
    updateErrors,
    resetUpdate,
    open,
    selectedId,
    handleOpen,
    handleClose,
    searchTerm,
    handleSearchChange,
    handleClearSearch,
    filteredData,
    sortField,
    sortDirection,
    handleSortChange,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginated,
    dispatch,
  } = useUsers();

  const columns = [
    { id: "fullName", label: "fullName" },
    { id: "email", label: "Email" },
    {
      id: "role",
      label: "Role",
      render: (row) => {
        let color = "default"; // fallback color
        if (row.role === "admin")
          color = "primary"; // blue
        else if (row.role === "trainer")
          color = "warning"; // yellow/orange
        else if (row.role === "client") color = "success"; // green

        return (
          <Chip
            sx={{ fontWeight: 600 }}
            label={row.role}
            color={color}
            variant="outlined"
          />
        );
      },
    },
    {
      id: "actions",
      label: "Actions",
      renderActions: (row) => (
        <div className="flex items-center h-full gap-2">
          <CustomIconButton
            size="small"
            color="warning"
            tooltip="Edit"
            onClick={() => openUpdateDrawer(row._id)}
            icon={<CreateIcon />}
          />
          <CustomIconButton
            color="error"
            size="small"
            tooltip="Delete"
            onClick={() => handleOpen(row._id)}
            icon={<DeleteIcon />}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography variant="h1">Users</Typography>
        <CustomButton onClick={() => openDrawer()} size="large">
          <AddIcon /> Add a new User
        </CustomButton>
      </div>
      <CustomMenuFilter
        sortField={sortField}
        sortDirection={sortDirection}
        handleSortChange={handleSortChange}
        searchTerm={searchTerm}
        handleClearSearch={handleClearSearch}
        handleSearchChange={handleSearchChange}
        sortOptions={[
          {
            label: (
              <>
                Name (asc) <ArrowUpwardIcon fontSize="small" />
              </>
            ),
            field: "name",
            direction: "asc",
          },
          {
            label: (
              <>
                Name (desc) <ArrowDownwardIcon fontSize="small" />
              </>
            ),
            field: "name",
            direction: "desc",
          },
          {
            label: (
              <>
                Role (asc) <ArrowUpwardIcon fontSize="small" />
              </>
            ),
            field: "role",
            direction: "asc",
          },
          {
            label: (
              <>
                Role (desc) <ArrowDownwardIcon fontSize="small" />
              </>
            ),
            field: "role",
            direction: "desc",
          },
        ]}
      />
      <CustomTable
        columns={columns}
        data={paginated}
        page={page}
        isLoading={loading}
        rowsPerPage={rowsPerPage}
        totalCount={filteredData.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {/* ADD CATEGORIE DRAWER */}
      <CustomDrawer
        title={"Add a new User"}
        open={drawerOpen}
        onClose={() => {
          closeDrawer();
          reset();
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            px: 5,
            py: 5,
            borderRadius: 10,
          }}
        >
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {userFields.map((field, index) => (
              <RenderFormField
                key={index}
                index={index}
                field={field}
                control={control}
                errors={errors}
              />
            ))}
          </form>
        </Box>
      </CustomDrawer>
      {/* UPDATE CATEGORIE DRAWER */}
      <CustomDrawer
        title={"Update a category"}
        open={drawerUpdateOpen}
        onClose={() => {
          closeUpdateDrawer();
          resetUpdate(); // Reset the form when the drawer is closed
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            px: 5,
            py: 5,
            borderRadius: 10,
          }}
        >
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleUpdateSubmit(onSubmit)}
          >
            {userUpdateFields.map((field, index) => (
              <RenderFormField
                key={index}
                index={index}
                field={field}
                control={updateControl}
                errors={updateErrors}
              />
            ))}
          </form>
        </Box>
      </CustomDrawer>
      {/* DELETE CATEGORIE MODAL */}
      <CustomModal
        open={open}
        onClose={() => handleClose()}
        actions={
          <>
            <CustomButton
              variant="outlined"
              color="inherit"
              onClick={() => handleClose()}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(deleteUser(selectedId));
                handleClose();
                showToast("user deleted successfully!", "warning");
              }}
            >
              delete
            </CustomButton>
          </>
        }
      >
        <Typography>Are you sure you want to delete this categorie</Typography>
      </CustomModal>
    </div>
  );
};

export default Users;
