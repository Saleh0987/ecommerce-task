import React, {useMemo} from "react";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const maxPagesToShow = 3;

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
      >
        Previous
      </button>
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 rounded ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
          }`}
        >
          {i}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
      >
        Next
      </button>
    );

    return pages;
  };

  const memoizedPageNumbers = useMemo(
    () => renderPageNumbers(),
    [currentPage, totalPages]
  );

  return (
    <div className="container mx-auto px-4 py-4 flex justify-center gap-2 flex-wrap">
      {memoizedPageNumbers}
    </div>
  );
};

export default Pagination;
