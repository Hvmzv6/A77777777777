import { useState } from "react";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    handleSearchChange,
    handleClearSearch,
  };
};
