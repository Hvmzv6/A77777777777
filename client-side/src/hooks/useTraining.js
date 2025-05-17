import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import pdfheader from "../assets/pdfheader.jpg";
import {
  addTraining,
  getTraining,
  getTrainingByClient,
  getTrainingByTrainer,
  updateTraining,
} from "../store/training/action";
import { useDrawer } from "./useDrawer";
import { useModal } from "./useModal";
import usePaginate from "./usePaginate";
import { useSearch } from "./useSearch";
import useSort from "./useSort";
import { useTheme } from "./useTheme";
import { useUsers } from "./useUsers";
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
export function useTraining() {
  const { loading, data, error } = useSelector((state) => state.training);
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
  const role = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const { open: drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const {
    open: drawerUpdateOpen,
    selectedId: drawerId,
    openDrawer: openUpdateDrawer,
    closeDrawer: closeUpdateDrawer,
  } = useDrawer();
  const { open, selectedId, handleOpen, handleClose } = useModal();
  const dispatch = useDispatch();
  console.log("training data", data);

  const fetchtrainings = useCallback(async () => {
    if (role === "client") {
      dispatch(getTrainingByClient(userId));
    } else if (role === "trainer") {
      dispatch(getTrainingByTrainer(userId));
    } else {
      dispatch(getTraining());
    }
  }, [dispatch, role, userId]);

  useEffect(() => {
    fetchtrainings();
  }, [dispatch, fetchtrainings]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(programSchema),
  });
  const onSubmit = async (values) => {
    if (drawerId) {
      dispatch(updateTraining({ drawerId, values }));
      closeUpdateDrawer();
      reset();
    } else {
      dispatch(addTraining(values));
      closeDrawer();
      reset();
    }
  };
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
  const { searchTerm, handleSearchChange, handleClearSearch } = useSearch();
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    return sortedData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortedData]);

  const {
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginateData,
  } = usePaginate(0, 5);

  const paginated = paginateData(filteredData);

  useEffect(() => {
    if (drawerId && data.length) {
      const program = data.find((item) => item._id === drawerId);
      if (program) {
        // Set top-level fields for the update form
        Object.keys(program).forEach((key) => {
          if (key !== "_id" && key !== "id") {
            setValue(key, program[key]); // Use react-hook-form's setValue
          }
        });
      }
    }
  }, [drawerId, data, setValue]);
  const preparePdfData = () => {
    const trainingData = filteredData.map((item) => ({
      ref: item.ref || "",
      trainingNumber: "", // Not present in your columns
      theme: item.theme || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      days: item.numberOfDays || "",
      trainer: item.trainerName || "",
      trainerPhone: item.trainerPhone || "",
      cin: item.CIN || "",
      company: item.clientName || "",
      companyPhone: item.clientPhone || "",
    }));

    return {
      headerData: {
        imageSrc: pdfheader, // Reference the new image

        address: "Avenue Jadida Maghrébia - B.P N° 207- 8000 Nabeul",
        contact:
          "E-mail: cpfmi@planet.tn | Mobile: 20 346 582 | Tél: 72 233 999",
        website: "www.cpfmi.com",
        title:
          "TABLEAU DE BORD DE SUIVI DE RÉALISATION DES ACTIONS DE FORMATION 2025",
      },
      tableHeaders: [
        "Réf.",
        "N° F",
        "Thèmes",
        "Début",
        "Fin",
        "Nb jours",
        "Formateurs",
        "Téléphone",
        "N° C.I.N.",
        "Sociétés",
        "Téléphone",
      ],
      items: trainingData,
    };
  };
  return {
    loading,
    error,
    data,
    drawerOpen,
    openDrawer,
    closeDrawer,
    drawerUpdateOpen,
    openUpdateDrawer,
    closeUpdateDrawer,
    drawerId,
    onSubmit,
    control,
    handleSubmit,
    errors,
    programFields,
    programUpdateFields,
    sortedData,
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
  };
}
