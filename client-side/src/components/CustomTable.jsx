import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

const getAvailabilityColor = (status) => {
  switch (status.toLowerCase()) {
    case "in-stock":
      return "green";
    case "out of stock":
      return "red";
    case "low stock":
      return "orange";
    default:
      return "gray";
  }
};

const CustomTable = ({
  columns,
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
  isLoading,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.background.alt }}>
              {columns.map((col) => (
                <TableCell key={col.id} sx={{ fontWeight: "bold" }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {columns.map((col) => (
                      <TableCell key={col.id}>
                        <Skeleton variant="text" height={24} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    {columns.map((col) => {
                      const value = row[col.id];
                      if (col.id === "availability") {
                        return (
                          <TableCell key={col.id}>
                            <Typography
                              fontWeight="bold"
                              sx={{ color: getAvailabilityColor(value) }}
                            >
                              {value}
                            </Typography>
                          </TableCell>
                        );
                      }
                      if (col.id === "status") {
                        return (
                          <TableCell key={col.id}>{col.render(row)}</TableCell>
                        );
                      }
                      if (col.id === "role") {
                        return (
                          <TableCell key={col.id}>{col.render(row)}</TableCell>
                        );
                      }
                      if (col.id === "actions" && col.renderActions) {
                        return (
                          <TableCell key={col.id} align="right">
                            {col.renderActions(row)}
                          </TableCell>
                        );
                      }
                      return <TableCell key={col.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        sx={{ backgroundColor: theme.palette.background.alt }}
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default CustomTable;
