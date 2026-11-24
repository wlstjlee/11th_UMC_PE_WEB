"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "./pagination";

interface MovieListPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function MovieListPagination({
  currentPage,
  totalPages,
}: MovieListPaginationProps) {
  const router = useRouter();

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => router.push(`/?page=${page}`)}
    />
  );
}
