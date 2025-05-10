import { useMemo, useState } from "react";

const useSort = (data, defaultField = "name", defaultDirection = "asc") => {
  const [sortField, setSortField] = useState(defaultField);
  const [sortDirection, setSortDirection] = useState(defaultDirection);
  const sortedData = useMemo(() => {
    if (!sortField) return data;

    const sorted = [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortField, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const updateSortField = (field) => {
    if (field === sortField) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const handleSortChange = (value) => {
    const [field, direction] = value.split("-");
    updateSortField(field, direction);
  };
  return {
    sortedData,
    sortField,
    sortDirection,
    updateSortField,
    handleSortChange,
  };
};

export default useSort;
