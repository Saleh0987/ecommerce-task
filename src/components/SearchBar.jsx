import React, {useState, useCallback} from "react";
import {debounce} from "lodash";

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none "
      />
    </div>
  );
};

export default SearchBar;
