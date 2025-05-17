import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/CustomButton";
import CustomDrawer from "../../components/CustomDrawer";
import CustomIconButton from "../../components/CustomIconButton";
import CustomMenuFilter from "../../components/CustomMenuFilter";
import CustomModal from "../../components/CustomModal";
import CustomTable from "../../components/CustomTable";
import RenderFormField from "../../components/RenderFormField";
import { useTraining } from "../../hooks/useTraining";
import {
  approveTraining,
  declineTraining,
  deleteTraining,
} from "../../store/training/action";

const TrainingRequest = () => {
  const dispatch = useDispatch();
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
    programFields,
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
  } = useTraining();

  // useEffect(() => {
  //   const userId = "admin_user_id"; // Replace with actual admin user ID from auth context
  //   socket.emit("join", { userId, role: "admin" });

  //   socket.on("newTrainingRequest", (notification) => {
  //     console.log("New training request:", notification);
  //     showToast(notification.message); // Replace with react-toastify or similar
  //     dispatch(getTraining());
  //   });

  //   return () => {
  //     socket.off("newTrainingRequest");
  //   };
  // }, [dispatch]);

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
          {row.status === "pending" && (
            <>
              <CustomIconButton
                size="small"
                color="success"
                tooltip="Approve"
                onClick={() => dispatch(approveTraining(row.id))}
                icon={<CheckIcon />}
              />
              <CustomIconButton
                size="small"
                color="error"
                tooltip="Decline"
                onClick={() => dispatch(declineTraining(row.id))}
                icon={<CloseIcon />}
              />
            </>
          )}
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
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography variant="h1">Training Request</Typography>
        <CustomButton onClick={() => openDrawer()} size="large">
          <AddIcon /> Add a new Training request
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
        title={"Add a new request"}
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
            {programFields.map((field, index) => (
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
            {programFields.map((field, index) => (
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

export default TrainingRequest;
