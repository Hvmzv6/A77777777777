import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import {
  addParticipant,
  getParticipants,
  updateParticipant,
} from "../store/participants/action";
import { useDrawer } from "./useDrawer";
import { useModal } from "./useModal";
import usePaginate from "./usePaginate";
import { useSearch } from "./useSearch";
import useSort from "./useSort";

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
export function useParticipant() {
  const { loading, data } = useSelector((state) => state.participantsReducer);

  const userId = useSelector((state) => state.global.user);

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
  return {
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
    drawerId,
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
  };
}
