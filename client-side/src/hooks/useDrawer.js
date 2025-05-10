import { useState } from "react";

export const useDrawer = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDrawer = (id = null) => {
    setSelectedId(id);
    setOpen(true);
  };

  const closeDrawer = () => {
    setSelectedId(null);
    setOpen(false);
  };

  return {
    open,
    selectedId,
    openDrawer,
    closeDrawer,
  };
};
