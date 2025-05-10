import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const CustomFilter = ({ value, onChange, options, label }) => {
  return (
    <FormControl size="medium">
      <Select
        sx={{ minWidth: "10vw" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography>{label}</Typography>
              </Box>
            );
          }

          const selectedOption = options.find((opt) => opt.value === selected);
          return selectedOption ? selectedOption.label : label;
        }}
      >
        <MenuItem disabled value="">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>{label}</Typography>
          </Box>
        </MenuItem>

        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomFilter;
