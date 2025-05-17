import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { addUser, getUsers, updateUser } from "../store/user/action";
import { showToast } from "../utils/toastUtils";
import { useDrawer } from "./useDrawer";
import { useModal } from "./useModal";
import usePaginate from "./usePaginate";
import { useSearch } from "./useSearch";
import useSort from "./useSort";
const userShcema = z.object({
  fullName: z.string().nonempty({ message: "Category name is required" }),
  email: z.string().nonempty({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),

  role: z.enum(["admin", "trainer", "client"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});
const userUpdateShcema = z.object({
  fullName: z.string().nonempty({ message: "Category name is required" }),
  email: z.string().nonempty({ message: "Email is required" }),
  role: z.enum(["admin", "trainer", "client"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});

export function useUsers() {
  const { loading, data } = useSelector((state) => state.usersReducer);
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
  } = useForm({
    resolver: zodResolver(userShcema),
  });
  const {
    control: updateControl,
    handleSubmit: handleUpdateSubmit,
    setValue: setUpdateValue,
    formState: { errors: updateErrors },
    reset: resetUpdate,
  } = useForm({
    resolver: zodResolver(userUpdateShcema),
  });
  const { open, selectedId, handleOpen, handleClose } = useModal();

  const onSubmit = async (values) => {
    if (drawerId) {
      const { fullName, email, role } = values;
      dispatch(updateUser({ drawerId, values: { fullName, email, role } }));
      resetUpdate();
      closeUpdateDrawer();
      showToast("user updated successfully!", "success");
    } else {
      dispatch(addUser(values));
      reset();
      closeDrawer();
      showToast("user created successfully!", "success");
    }
  };

  const fetchUsers = useCallback(async () => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [dispatch, fetchUsers]);

  const { searchTerm, handleSearchChange, handleClearSearch } = useSearch();

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
      const user = data.find((item) => item.id === drawerId);
      if (user) {
        // Set the form values when the update drawer is opened
        setUpdateValue("fullName", user.fullName);
        setUpdateValue("email", user.email);
        setUpdateValue("role", user.role);
      }
    }
  }, [drawerId, data, setUpdateValue]);
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
