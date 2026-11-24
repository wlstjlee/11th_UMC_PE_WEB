import { Suspense } from "react";
import { getPopularMovies } from "@/api/movies/server/get-popular-movies";
import { MovieGrid } from "@/components/movies/movie-grid";
import { MovieListPagination } from "@/components/movies/movie-list-pagination";
import { MAX_TMDB_PAGE, toPageNumber } from "@/utils/movies/page-number";

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto box-border flex min-h-[1185px] w-[1440px] max-w-full flex-col items-start gap-5 px-20 py-6">
      <h1 className="m-0 text-[28px] font-bold text-gray-900">영화 목록</h1>

      <Suspense fallback={<p className="text-gray-500">불러오는 중........</p>}>
        <MovieListSection searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function MovieListSection({
  searchParams,
}: Pick<PageProps<"/">, "searchParams">) {
  const { page } = await searchParams;
  const currentPage = toPageNumber(page);

  const movies = await getPopularMovies(currentPage);
  const totalPages = Math.min(movies.total_pages, MAX_TMDB_PAGE);

  if (movies.results.length === 0) {
    return <p className="text-gray-500">표시할 영화가 없어요.</p>;
  }

  return (
    <>
      <MovieGrid movies={movies.results} />
      {totalPages > 1 && (
        <MovieListPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
