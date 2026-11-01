import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto box-border flex min-h-[1185px] w-[1440px] max-w-full flex-col items-start gap-5 px-20 py-6">
      <h1 className="m-0 text-[28px] font-bold text-gray-900">영화 목록</h1>

      {moviesQuery.isPending ? (
        <p className="text-gray-500">불러오는 중........</p>
      ) : moviesQuery.isError ? (
        <p className="text-red-500">영화 목록을 불러오지 못했어요.</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500">표시할 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
}