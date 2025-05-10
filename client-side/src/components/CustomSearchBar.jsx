import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

const CustomSearchBar = ({
  searchTerm,
  handleSearchChange,
  handleClearSearch,
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={searchTerm ? handleClearSearch : undefined}>
              {searchTerm ? <ClearIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomSearchBar;
