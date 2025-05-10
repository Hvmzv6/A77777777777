import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../components/CustomButton";
import CustomDrawer from "../components/CustomDrawer";
import CustomIconButton from "../components/CustomIconButton";
import CustomMenuFilter from "../components/CustomMenuFilter";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import RenderFormField from "../components/RenderFormField";
import { useTheme } from "../hooks/useTheme";
import { deleteTheme } from "../store/theme/action";

const themeFields = [
  {
    name: "name",
    label: "Theme Name",
    type: "text",
    placeholder: "Enter theme name",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter theme description",
  },
  {
    type: "button",
    text: "Create Theme",
  },
];
const Theme = () => {
  const {
    loading,
    drawerOpen,
    openDrawer,
    closeDrawer,
    drawerUpdateOpen,
    openUpdateDrawer,
    closeUpdateDrawer,
    handleOpen,
    onSubmit,
    control,
    handleSubmit,
    errors,
    reset,
    open,
    selectedId,
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
  } = useTheme();
  const columns = [
    { id: "name", label: "Theme Name" },
    { id: "description", label: "Description" },
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
        <Typography variant="h1">Themes</Typography>
        <CustomButton onClick={() => openDrawer()} size="large">
          <AddIcon /> Add a new Theme
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
        onAddProduct={() => {}}
        onFilterClick={() => {}}
        onDownload={() => {}}
      />
      {/* ADD CATEGORIE DRAWER */}
      <CustomDrawer
        title={"Add a new Theme"}
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
            {themeFields.map((field, index) => (
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
          reset(); // Reset the form when the drawer is closed
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
            {themeFields.map((field, index) => (
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
                dispatch(deleteTheme(selectedId));
                handleClose();
              }}
            >
              delete
            </CustomButton>
          </>
        }
      >
        <Typography>Are you sure you want to delete this Theme</Typography>
      </CustomModal>
    </div>
  );
};

export default Theme;
