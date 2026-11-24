"use client";

import { cn } from "../../utils/cn";

// 현재 페이지를 가운데 두고 한 번에 보여줄 번호 개수
const WINDOW_SIZE = 5;

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
  const visiblePages = getVisiblePages(currentPage, totalPages);

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
        {visiblePages.map((page) =>
          typeof page === "number" ? (
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
          ) : (
            <li
              key={page}
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center text-sm text-gray-400"
            >
              …
            </li>
          ),
        )}
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

type VisiblePage = number | "ellipsis-start" | "ellipsis-end";

// 현재 페이지 주변 번호만 보여주고, 첫/마지막 페이지는 항상 남겨 멀리 이동할 수 있게 해요.
function getVisiblePages(
  currentPage: number,
  totalPages: number,
): VisiblePage[] {
  const size = Math.min(WINDOW_SIZE, totalPages);
  const start = Math.max(
    1,
    Math.min(currentPage - Math.floor(size / 2), totalPages - size + 1),
  );
  const end = start + size - 1;

  const pages: VisiblePage[] = [];

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("ellipsis-start");
    }
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push("ellipsis-end");
    }
    pages.push(totalPages);
  }

  return pages;
}
