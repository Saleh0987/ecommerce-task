import React from "react";

const CategoryFilter = ({categories, selectedCategory, onCategoryChange}) => {
  return (
    <div className="mb-6 flex justify-center">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none focus:ring-2
         focus:ring-blue-600"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
