import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { addTheme, getThemes, updateTheme } from "../store/theme/action";
import { useDrawer } from "./useDrawer";
import { useModal } from "./useModal";
import usePaginate from "./usePaginate";
import { useSearch } from "./useSearch";
import useSort from "./useSort";

// Define the schema for both create and update
const themeSchema = z.object({
  name: z.string().nonempty({ message: "Theme name is required" }),
  description: z.string().optional(),
});

export function useTheme() {
  const { loading, data } = useSelector((state) => state.themeReducer);
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
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(themeSchema),
  });
  const { open, selectedId, handleOpen, handleClose } = useModal();

  const onSubmit = async (values) => {
    if (drawerId) {
      dispatch(updateTheme({ drawerId, values }));
      reset();
      closeUpdateDrawer();
    } else {
      dispatch(addTheme(values));
      reset();
      closeDrawer();
    }
  };

  const fetchThemes = useCallback(async () => {
    dispatch(getThemes());
  }, [dispatch]);

  useEffect(() => {
    fetchThemes();
  }, [dispatch, fetchThemes]);

  const { searchTerm, handleSearchChange, handleClearSearch } = useSearch();

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const { sortedData, sortField, sortDirection, handleSortChange } =
    useSort(filteredData);

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
      const theme = data.find((item) => item._id === drawerId);
      if (theme) {
        // Set the form values when the update drawer is opened
        setValue("name", theme.name);
        setValue("description", theme.description);
      }
    }
  }, [drawerId, data, setValue]);

  return {
    loading,
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
    reset,
    open,
    selectedId,
    handleOpen,
    handleClose,
    searchTerm,
    handleSearchChange,
    handleClearSearch,
    filteredData,
    sortedData,
    sortField,
    sortDirection,
    handleSortChange,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginated,
    dispatch,
  };
}
