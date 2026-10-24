import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { BookmarkButton } from "../../components/bookmark-button";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(query ?? "");

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const normalizedQuery = (query ?? "").trim();

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요ㅜ");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [query]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/search", search: { query: inputValue } });
  }

  return (
    <main className="mx-auto flex w-[1440px] max-w-full flex-col gap-5 px-20 py-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="영화 제목을 검색해 보세요"
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-base"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white"
        >
          검색
        </button>
      </form>

      {!query ? (
        <p className="text-gray-500">검색어를 입력해 주세요.</p>
      ) : (
        <>
          <h1 className="m-0 text-2xl font-bold text-gray-900">
            "{query}" 검색 결과
          </h1>

          {isLoading && <p className="text-gray-500">검색 중...</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {!isLoading && !errorMessage && (
            <>
              <p className="text-gray-500">
                {movies.length}개의 영화를 찾았어요.
              </p>

              {movies.length === 0 ? (
                <p className="text-gray-500">검색 결과가 없어요.</p>
              ) : (
                <ul className="m-0 flex list-none flex-col gap-6 p-0">
                  {movies.map((movie) => {
                    const posterUrl = getTmdbPosterUrl(movie.poster_path);

                    return (
                      <li key={movie.id} className="relative">
                        <Link
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                          className="flex gap-4"
                        >
                          {posterUrl ? (
                            <img
                              src={posterUrl}
                              alt={`${movie.title} 포스터`}
                              className="h-48 w-32 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-48 w-32 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-400">
                              이미지 없음
                            </div>
                          )}
                          <div className="flex flex-col gap-1">
                            <h2 className="m-0 text-lg font-semibold text-gray-900">
                              {movie.title}
                            </h2>
                            <p className="m-0 text-sm text-gray-500">
                              {movie.original_title}
                            </p>
                            <p className="m-0 text-sm text-gray-500">
                              {movie.release_date}
                            </p>
                            <p className="m-0 text-sm text-gray-700">
                              {movie.overview}
                            </p>
                          </div>
                        </Link>

                        {/* Link 안에 button을 넣으면 클릭 시 페이지가 이동하므로 형제로 배치 */}
                        <BookmarkButton
                          movieId={movie.id}
                          className="absolute right-0 top-0"
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}