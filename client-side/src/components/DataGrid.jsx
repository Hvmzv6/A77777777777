import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const CustomDataGrid = ({
  loading,
  data,
  columns,
  sx,
  initialState,
  height = "75vh",
  getRowId = (row) => row.id,
}) => {
  const theme = useTheme();

  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      borderRadius={"0.55rem"}
      width={"100%"}
      height={height}
    >
      <DataGrid
        loading={loading}
        rows={data || []}
        columns={columns}
        getRowId={getRowId}
        initialState={initialState}
        sx={sx}
      />
    </Box>
  );
};

export default CustomDataGrid;