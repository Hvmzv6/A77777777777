import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = (id = null) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return {
    open,
    selectedId,
    handleOpen,
    handleClose,
  };
};
