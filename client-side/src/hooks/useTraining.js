import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTraining,
  getTraining,
  updateTraining,
} from "../store/training/action";
import { useDrawer } from "./useDrawer";

export function useTraining() {
  const { loading, data, error } = useSelector(
    (state) => state.trainingReducer
  );

  const { open: drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const {
    open: drawerUpdateOpen,
    selectedId: drawerId,
    openDrawer: openUpdateDrawer,
    closeDrawer: closeUpdateDrawer,
  } = useDrawer();

  const dispatch = useDispatch();
  console.log("training data", data);

  const fetchtrainings = useCallback(async () => {
    dispatch(getTraining());
  }, [dispatch]);

  useEffect(() => {
    fetchtrainings();
  }, [dispatch, fetchtrainings]);

  const onSubmit = async (values) => {
    if (drawerId) {
      dispatch(updateTraining({ drawerId, values }));
      closeUpdateDrawer();
    } else {
      dispatch(addTraining(values));
      closeDrawer();
    }
  };

  const transformedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      id: item._id,
    }));
  }, [data]);

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
    transformedData,
  };
}
