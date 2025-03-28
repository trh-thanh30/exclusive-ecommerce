import { current } from "@reduxjs/toolkit";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Paginations({ pagination, setQuery, query }) {
  const { currentPage, totalPages } = pagination;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setQuery({ ...query, page: currentPage + 1 });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setQuery({ ...query, page: currentPage - 1 });
    }
  };

  const handlePageClick = (page) => {
    setQuery({ ...query, page });
  };

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4 text-sm mt-14">
      {/* Nút Previous */}
      <button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className="p-2 transition-colors rounded-full hover:bg-primary-900 hover:text-primary-50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <FaChevronLeft />
      </button>

      {/* Danh sách số trang */}
      {getPages()?.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={currentPage === page}
          className={`flex items-center justify-center h-7 w-7 transition-colors rounded-full hover:bg-primary-900 hover:text-primary-50 disabled:cursor-not-allowed disabled:opacity-70 ${
            currentPage === page ? "bg-primary-900 text-primary-50" : null
          }`}
        >
          {page}
        </button>
      ))}

      {/* Nút Next */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="p-2 transition-colors rounded-full hover:bg-primary-900 hover:text-primary-50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
