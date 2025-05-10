import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
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
import {
  addParticipant,
  deleteParticipant,
  getParticipants,
  updateParticipant,
} from "../store/participants/action";

// Fields for creating and updating Programs

// Validation schemas
const participantSchema = z.object({
  fullName: z.string().nonempty({ message: "Full name is required" }),
  sex: z.enum(["homme", "femme"], { message: "Sex is required" }),
  matriculeCnss: z.string().nonempty({ message: "Matricule CNSS is required" }),
  CIN: z
    .string()
    .nonempty({ message: "CIN is required" }) // Assuming CIN is a string
    .length(8, { message: "CIN must be exactly 8 characters" }),
  qualification: z.string().nonempty({ message: "Qualification is required" }),
  lieuAffectation: z
    .string()
    .nonempty({ message: "Lieu d'Affectation is required" }),
});

const Participants = () => {
  const { loading, data } = useSelector((state) => state.participantsReducer);

  const userId = useSelector((state) => state.global.user);
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

  const dispatch = useDispatch();
  const { open: drawerOpen, openDrawer, closeDrawer } = useDrawer();

  const {
    open: drawerUpdateOpen,
    selectedId: drawerId,
    openDrawer: openUpdateDrawer,
    closeDrawer: closeUpdateDrawer,
  } = useDrawer();
  console.log("🚀 ~ Participants ~ drawerId:", drawerId);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(participantSchema),
  });

  const { open, handleOpen, selectedId, handleClose } = useModal();

  const onSubmit = async (values) => {
    const postData = { ...values, clientId: userId };
    if (drawerId) {
      dispatch(updateParticipant({ drawerId, values: postData }));
      reset();
      closeUpdateDrawer();
    } else {
      dispatch(addParticipant(postData));
      reset();
      closeDrawer();
    }
  };

  const fetchParticipants = useCallback(async () => {
    dispatch(getParticipants(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const { searchTerm, handleSearchChange, handleClearSearch } = useSearch();

  const { sortedData, sortField, sortDirection, handleSortChange } = useSort(
    data,
    "fullName"
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
      const participant = data.find((item) => item._id === drawerId);
      if (participant) {
        // Set top-level fields for the update form
        Object.keys(participant).forEach((key) => {
          if (key !== "_id" && key !== "id") {
            setValue(key, participant[key]); // Use react-hook-form's setValue
          }
        });
      }
    }
  }, [drawerId, data, setValue]);

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
