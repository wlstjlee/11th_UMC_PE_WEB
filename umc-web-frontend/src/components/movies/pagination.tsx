import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const buttonBaseClass =
    "h-8 w-8 rounded-md border-none bg-transparent text-sm text-gray-500 cursor-pointer hover:bg-gray-100";

  return (
    <nav className="mt-8 flex items-center gap-2" aria-label="페이지 이동">
      <button
        type="button"
        className={cn(
          buttonBaseClass,
          "disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent",
        )}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="이전 페이지"
      >
        {"<"}
      </button>

      <ul className="m-0 flex list-none gap-1 p-0">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={cn(
                buttonBaseClass,
                page === currentPage &&
                  "bg-gray-900 text-white font-semibold hover:bg-gray-900",
              )}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn(
          buttonBaseClass,
          "disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent",
        )}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="다음 페이지"
      >
        {">"}
      </button>
    </nav>
  );
}