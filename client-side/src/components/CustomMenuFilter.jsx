import React from "react";
import CustomFilter from "./CustomFilter";
import CustomSearchBar from "./CustomSearchBar";
import SortSelect from "./CustomSort";

const CustomMenuFilter = ({
  sortField,
  sortDirection,
  handleSortChange,
  sortOptions,
  searchTerm,
  handleClearSearch,
  handleSearchChange,
  filter,
  setFilter,
  filterOptions,
  label,
}) => {
  return (
    <div className="flex items-center justify-between ">
      <CustomSearchBar
        searchTerm={searchTerm}
        handleClearSearch={handleClearSearch}
        handleSearchChange={handleSearchChange}
      />
      <div className="flex gap-2 items-center">
        {filterOptions && (
          <CustomFilter
            value={filter}
            onChange={setFilter}
            options={filterOptions}
            label={label}
          />
        )}
        <SortSelect
          value={`${sortField}-${sortDirection}`}
          onChange={handleSortChange}
          options={sortOptions}
        />
      </div>
    </div>
  );
};

export default CustomMenuFilter;
