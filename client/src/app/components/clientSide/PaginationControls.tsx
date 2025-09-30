"use client";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageClick: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageClick,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#0DCAF0] text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-[#0DCAF0] text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}