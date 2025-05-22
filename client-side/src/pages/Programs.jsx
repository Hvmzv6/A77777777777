import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Box, Chip, Typography } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import CustomDrawer from "../components/CustomDrawer";
import CustomIconButton from "../components/CustomIconButton";
import CustomMenuFilter from "../components/CustomMenuFilter";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import RenderFormField from "../components/RenderFormField";
import { TrainingDashboardPdf } from "../components/TrainingDashboardPdf";
import { useTraining } from "../hooks/useTraining";
import { deleteTraining } from "../store/training/action";

const Programs = () => {
  const dispatch = useDispatch();
  const {
    loading,

    openUpdateDrawer,

    onSubmit,
    control,
    handleSubmit,
    errors,
    programUpdateFields,
    sortField,
    sortDirection,
    handleSortChange,
    searchTerm,
    handleSearchChange,
    handleClearSearch,
    filteredData,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginated,
    open,
    selectedId,
    handleOpen,
    handleClose,
    reset,
    preparePdfData,
    handleApprove,
    handleReject,
    role,
    drawerOpen,
    openDrawer,
    closeDrawer,
  } = useTraining();

  // Map filteredData to PDF data format

  const columns = [
    { id: "ref", label: "Ref" },
    { id: "title", label: "Title" },
    { id: "theme", label: "Theme" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "numberOfDays", label: "Days" },
    { id: "trainerName", label: "Trainer" },
    { id: "trainerPhone", label: "Trainer Phone" },
    { id: "CIN", label: "CIN" },
    { id: "clientName", label: "Client" },
    { id: "clientPhone", label: "Client Phone" },
    {
      id: "status",
      label: "Status",
      render: (row) => {
        let color = "default";
        if (row.status === "pending") color = "warning";
        else if (row.status === "confirmed") color = "primary";
        else if (row.status === "completed") color = "success";
        else if (row.status === "cancelled") color = "error";
        return (
          <Chip
            sx={{ fontWeight: 600 }}
            label={row.status}
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
        <div className="flex items-center gap-2">
          <CustomIconButton
            size="small"
            color="warning"
            tooltip="Edit"
            onClick={() => openUpdateDrawer(row.id)}
            icon={<CreateIcon />}
          />
          <CustomIconButton
            color="error"
            size="small"
            tooltip="Delete"
            onClick={() => handleOpen(row.id)}
            icon={<DeleteIcon />}
          />
          {row.status === "pending" && role === "admin" && (
            <>
              <CustomIconButton
                color="success"
                size="small"
                tooltip="Approuver"
                onClick={() => {
                  handleApprove(row.id);
                }}
                icon={<CheckIcon />}
              />
              <CustomIconButton
                color="error"
                size="small"
                tooltip="Rejeter"
                onClick={() => handleReject(row.id)}
                icon={<CloseIcon />}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography variant="h1">Programs</Typography>
        <div className="flex gap-2">
          {role === "admin" && (
            <>
              <CustomButton
                size="large"
                color="success"
                disabled={filteredData.length === 0}
                startIcon={<PictureAsPdfIcon />}
                onClick={async () => {
                  const blob = await pdf(
                    <TrainingDashboardPdf
                      orientation="landscape"
                      {...preparePdfData()}
                    />
                  ).toBlob();
                  const url = URL.createObjectURL(blob);
                  window.open(url); // Open in new tab
                }}
              >
                Export to PDF
              </CustomButton>
            </>
          )}
          {role === "client" && (
            <CustomButton
              size="large"
              color="primary"
              onClick={() => openDrawer()}
            >
              Add Program
            </CustomButton>
          )}
        </div>
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
                Theme (asc) <ArrowUpwardIcon fontSize="small" />
              </>
            ),
            field: "theme",
            direction: "asc",
          },
          {
            label: (
              <>
                Theme (desc) <ArrowDownwardIcon fontSize="small" />
              </>
            ),
            field: "theme",
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
      <CustomDrawer
        title={"Update a Program"}
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
            {programUpdateFields.map((field, index) => {
              return (
                <RenderFormField
                  key={index}
                  index={index}
                  field={field}
                  control={control}
                  errors={errors}
                />
              );
            })}
          </form>
        </Box>
      </CustomDrawer>
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
                dispatch(deleteTraining(selectedId));
                handleClose();
              }}
            >
              Delete
            </CustomButton>
          </>
        }
      >
        <Typography>Are you sure you want to delete this program?</Typography>
      </CustomModal>
    </div>
  );
};

export default Programs;
