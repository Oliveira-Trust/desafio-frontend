import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-2 py-1 border rounded-md text-sm font-medium mx-1
            ${
              i === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500"
            }
          `}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, []);

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-gray-600 disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-gray-600 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
