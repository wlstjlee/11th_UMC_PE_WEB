import { useState, useEffect } from "react";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

const MOVIES_PER_PAGE = 10;

export function MovieListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results);
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const currentPageMovies = movies.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE,
  );

  return (
    <main className="mx-auto box-border flex min-h-[1185px] w-[1440px] max-w-full flex-col items-start gap-5 px-20 py-6">
      <h1 className="m-0 text-[28px] font-bold text-gray-900">영화 목록</h1>

      {isLoading && <p className="text-gray-500">불러오는 중...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <>
          <MovieGrid movies={currentPageMovies} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </main>
  );
}