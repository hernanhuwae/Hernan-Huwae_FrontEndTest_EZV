
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;
    
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + showMax - 1);
    
    if (end - start < showMax - 1) {
      start = Math.max(1, end - showMax + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <div className="flex gap-2">
        {getPageNumbers().map((page) => (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`px-4 py-2 rounded-md transition-colors ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>

      <div className="ml-4 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}