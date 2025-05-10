import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import CustomButton from "../components/CustomButton";
import CustomDrawer from "../components/CustomDrawer";
import CustomIconButton from "../components/CustomIconButton";
import CustomMenuFilter from "../components/CustomMenuFilter";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import RenderFormField from "../components/RenderFormField";
import { useDrawer } from "../hooks/useDrawer";
import { useModal } from "../hooks/useModal";
import usePaginate from "../hooks/usePaginate";
import { useSearch } from "../hooks/useSearch";
import useSort from "../hooks/useSort";
import { useTheme } from "../hooks/useTheme";
import { useUsers } from "../hooks/useUsers";
import {
  addTraining,
  deleteTraining,
  getTraining,
  updateTraining,
} from "../store/training/action";

// Fields for creating and updating Programs

// Validation schemas
const programSchema = z.object({
  ref: z.string().nonempty({ message: "Reference is required" }),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  theme: z.string().nonempty({ message: "Theme is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  startDate: z.string().nonempty({ message: "Start date is required" }),
  endDate: z.string().nonempty({ message: "End date is required" }),
  trainer: z.string().nonempty({ message: "Trainer is required" }),
  trainerPhone: z.string().nonempty({ message: "Trainer phone is required" }),
  CIN: z.string().nonempty({ message: "CIN is required" }),
  client: z.string().nonempty({ message: "Client is required" }),
  clientPhone: z.string().nonempty({ message: "Client phone is required" }),
  participants: z.array(z.string()).optional(),
});

const Programs = () => {
  const { loading, data } = useSelector((state) => state.training);
  const { data: users } = useUsers();
  const { data: themes } = useTheme();
  const programFields = [
    {
      name: "ref",
      label: "Reference",
      type: "text",
      placeholder: "Enter program reference",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "theme",
      label: "Theme",
      type: "select",
      options: themes?.map((theme) => ({
        label: theme.name,
        value: theme._id,
        placeholder: "Select a theme",
      })),
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter program title",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
    },
    {
      name: "trainer",
      label: "Trainer",
      type: "select",
      options: users
        ?.filter((user) => user.role === "trainer")
        .map((user) => ({
          label: user.fullName,
          value: user._id,
        })),
      placeholder: "Select a trainer",
    },
    {
      name: "trainerPhone",
      label: "Trainer Phone",
      type: "text",
      placeholder: "Enter trainer phone number",
    },
    {
      name: "CIN",
      label: "CIN",
      type: "text",
      placeholder: "Enter trainer CIN",
    },
    {
      name: "client",
      label: "Client",
      type: "select",
      options: users
        ?.filter((user) => user.role === "client")
        .map((user) => ({
          label: user.fullName,
          value: user._id,
        })),
      placeholder: "Select a client",
    },
    {
      name: "clientPhone",
      label: "Client Phone",
      type: "text",
      placeholder: "Enter client phone number",
    },
    {
      name: "participants",
      label: "Participants",
      type: "multi-select",
      options: [], // Populate dynamically with participants from the database
      placeholder: "Select participants",
    },
    { type: "button", text: "Create Program" },
  ];

  const programUpdateFields = [
    {
      name: "ref",
      label: "Reference",
      type: "text",
      placeholder: "Enter program reference",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "theme",
      label: "Theme",
      type: "select",
      options:
        themes?.map((theme) => ({
          label: theme.name,
          value: theme._id,
        })) || [], // Dynamically populate themes
      placeholder: "Select a theme",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter program title",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      placeholder: "Select start date",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      placeholder: "Select end date",
    },
    {
      name: "trainer",
      label: "Trainer",
      type: "select",
      options:
        users
          ?.filter((user) => user.role === "trainer")
          .map((user) => ({
            label: user.fullName,
            value: user._id,
          })) || [], // Dynamically populate trainers
      placeholder: "Select a trainer",
    },
    {
      name: "trainerPhone",
      label: "Trainer Phone",
      type: "text",
      placeholder: "Enter trainer phone number",
    },
    {
      name: "CIN",
      label: "CIN",
      type: "text",
      placeholder: "Enter trainer CIN",
    },
    {
      name: "client",
      label: "Client",
      type: "select",
      options:
        users
          ?.filter((user) => user.role === "client")
          .map((user) => ({
            label: user.fullName,
            value: user._id,
          })) || [], // Dynamically populate clients
      placeholder: "Select a client",
    },
    {
      name: "clientPhone",
      label: "Client Phone",
      type: "text",
      placeholder: "Enter client phone number",
    },
    {
      name: "participants",
      label: "Participants",
      type: "multi-select",
      options: [], // Populate dynamically with participants from the database
      placeholder: "Select participants",
    },
    { type: "button", text: "Update Program" },
  ];

  const dispatch = useDispatch();
  const { open: drawerOpen, openDrawer, closeDrawer } = useDrawer();

  const {
    open: drawerUpdateOpen,
    selectedId: drawerId,
    openDrawer: openUpdateDrawer,
    closeDrawer: closeUpdateDrawer,
  } = useDrawer();
  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(programSchema),
  });

  const { open, handleOpen, selectedId, handleClose } = useModal();

  const onSubmit = async (values) => {
    if (drawerId) {
      dispatch(updateTraining({ drawerId, values }));
      reset();
      closeUpdateDrawer();
    } else {
      dispatch(addTraining(values));
      reset();
      closeDrawer();
    }
  };

  const fetchTrainings = useCallback(async () => {
    dispatch(getTraining());
  }, [dispatch]);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  const { searchTerm, handleSearchChange, handleClearSearch } = useSearch();

  const transformedData = useMemo(() => {
    return data.map((item) => {
      const trainerObj = users?.find((user) => user._id === item.trainer);
      const clientObj = users?.find((user) => user._id === item.client);
      const themeObj = themes?.find((theme) => theme._id === item.theme);
      const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-GB"); // dd/mm/yyyy
      return {
        id: item._id,
        ref: item.ref || "N/A",
        title: item.title || "N/A",
        theme: themeObj?.name || "Unknown Theme",
        status: item.status || "N/A",
        startDate: formatDate(item.startDate),
        endDate: formatDate(item.endDate),
        numberOfDays: Number.isFinite(item.numberOfDays)
          ? item.numberOfDays
          : 0,
        trainerName: trainerObj?.fullName || "Unknown Trainer",
        trainerPhone: item.trainerPhone || "N/A",
        CIN: item.CIN || "N/A",
        clientName: clientObj?.fullName || "Unknown Client",
        clientPhone: item.clientPhone || "N/A",
        participants: item.participants?.length || 0, // Count of participants
      };
    });
  }, [data, users, themes]);

  const { sortedData, sortField, sortDirection, handleSortChange } = useSort(
    transformedData,
    "theme"
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    return sortedData.filter((item) =>
      item.theme.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortedData]);

  const {
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginateData,
  } = usePaginate(0, 5);

  const paginated = paginateData(sortedData);
  useEffect(() => {
    if (drawerId && data.length) {
      const program = data.find((item) => item._id === drawerId);
      if (program) {
        console.log("🚀 ~ useEffect ~ program:", program);
        // Set top-level fields for the update form
        Object.keys(program).forEach((key) => {
          if (key !== "_id" && key !== "id") {
            setValue(key, program[key]); // Use react-hook-form's setValue
          }
        });
      }
    }
  }, [drawerId, data, setValue]);

  const columns = [
    { id: "ref", label: "Ref" },
    { id: "title", label: "Title" },
    {
      id: "theme",
      label: "Theme",
    },
    {
      id: "startDate",
      label: "Start Date",
    },
    {
      id: "endDate",
      label: "End Date",
    },
    {
      id: "numberOfDays",
      label: "Days",
    },
    {
      id: "trainerName",
      label: "Trainer",
    },
    {
      id: "trainerPhone",
      label: "Trainer Phone",
    },
    {
      id: "CIN",
      label: "CIN",
    },
    {
      id: "clientName",
      label: "Client",
    },
    {
      id: "clientPhone",
      label: "Client Phone",
    },
    {
      id: "status",
      label: "Status",
      render: (row) => {
        let color = "default";
        // fallback color

        if (row.status === "pending") color = "warning";
        else if (row.status === "confirmed") color = "primary";
        else if (row.status === "completed") color = "success";
        else if (row.status === "cancelled") color = "error"; // red

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
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography variant="h1">Programs</Typography>
        <CustomButton onClick={() => openDrawer()} size="large">
          <AddIcon /> Add a new Program
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
            {programUpdateFields.map((field, index) => (
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
