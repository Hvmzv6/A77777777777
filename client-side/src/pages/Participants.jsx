import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import CustomDrawer from "../components/CustomDrawer";
import CustomIconButton from "../components/CustomIconButton";
import CustomMenuFilter from "../components/CustomMenuFilter";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import RenderFormField from "../components/RenderFormField";
import { useParticipant } from "../hooks/useParticipant";
import { deleteParticipant } from "../store/participants/action";

const participantFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter participant full name",
  },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    options: [
      { label: "Homme", value: "homme" },
      { label: "Femme", value: "femme" },
    ],
    placeholder: "Select sex",
  },
  {
    name: "matriculeCnss",
    label: "Matricule CNSS",
    type: "text",
    placeholder: "Enter participant CNSS matricule",
  },
  {
    name: "CIN",
    label: "CIN",
    type: "text",
    placeholder: "Enter participant CIN",
  },
  {
    name: "qualification",
    label: "Qualification",
    type: "text",
    placeholder: "Enter participant qualification",
  },
  {
    name: "lieuAffectation",
    label: "Lieu d'Affectation",
    type: "text",
    placeholder: "Enter participant location of assignment",
  },
];

const Participants = () => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    reset,
    drawerOpen,
    openDrawer,
    closeDrawer,
    drawerUpdateOpen,
    openUpdateDrawer,
    closeUpdateDrawer,
    open,
    selectedId,
    handleOpen,
    handleClose,
    searchTerm,
    handleSearchChange,
    handleClearSearch,
    sortField,
    sortDirection,
    handleSortChange,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    filteredData,
    paginated,
    loading,
    dispatch,
  } = useParticipant();
  const columns = [
    { id: "fullName", label: "Full Name" },
    { id: "sex", label: "Sex" },
    { id: "matriculeCnss", label: "Matricule CNSS" },
    { id: "CIN", label: "CIN" },
    { id: "qualification", label: "Qualification" },
    { id: "lieuAffectation", label: "Lieu d'Affectation" },
    {
      id: "actions",
      label: "Actions",
      renderActions: (row) => (
        <div className="flex items-center gap-2">
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
        <Typography variant="h1">Participants</Typography>
        <CustomButton onClick={() => openDrawer()} size="large">
          <AddIcon /> Add a new Participant
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
            field: "fullName",
            direction: "asc",
          },
          {
            label: (
              <>
                Name (desc) <ArrowDownwardIcon fontSize="small" />
              </>
            ),
            field: "fullName",
            direction: "desc",
          },
        ]}
      />
      {/* data Table */}
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
      {/* ADD PROGRAM DRAWER */}
      <CustomDrawer
        title={"Add a new Program"}
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
            {participantFields.map((field, index) => (
              <RenderFormField
                key={index}
                index={index}
                field={field}
                control={control}
                errors={errors}
              />
            ))}
            <CustomButton type={"submit"} size="large">
              <AddIcon /> Create Participant
            </CustomButton>
          </form>
        </Box>
      </CustomDrawer>
      {/* UPDATE PROGRAM DRAWER */}
      <CustomDrawer
        title={"Update a Program"}
        open={drawerUpdateOpen}
        onClose={() => {
          closeUpdateDrawer();
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
            {participantFields.map((field, index) => (
              <RenderFormField
                key={index}
                index={index}
                field={field}
                control={control}
                errors={errors}
              />
            ))}
            <CustomButton color="warning" type={"submit"} size="large">
              <AddIcon /> Update Participant
            </CustomButton>
          </form>
        </Box>
      </CustomDrawer>
      {/* DELETE MODAL */}
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
                dispatch(deleteParticipant(selectedId));
                handleClose();
              }}
            >
              Delete
            </CustomButton>
          </>
        }
      >
        <Typography>
          Are you sure you want to delete this participant?
        </Typography>
      </CustomModal>
    </div>
  );
};

export default Participants;
