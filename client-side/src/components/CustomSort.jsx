import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
const SortSelect = ({ value, onChange, options }) => {
  return (
    <FormControl size="medium">
      <Select
        sx={{ minWidth: "10vw" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          const selectedOption = options.find(
            (opt) => `${opt.field}-${opt.direction}` === selected
          );
          return selectedOption ? selectedOption.label : "Sort by";
        }}
      >
        <MenuItem disabled value="">
          <Typography>Sort by</Typography>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem
            key={`${opt.field}-${opt.direction}`}
            value={`${opt.field}-${opt.direction}`}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortSelect;
