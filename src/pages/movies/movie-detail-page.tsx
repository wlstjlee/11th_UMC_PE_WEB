import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";

function formatRuntime(runtime: number | null) {
  if (runtime == null) {
    return "상영 시간 정보가 없어요.";
  }
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}시간 ${minutes}분`;
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (!isValidMovieId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error) => {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, isValidMovieId]);

  if (!isValidMovieId) {
    return (
      <main className="mx-auto w-[1440px] max-w-full px-20 py-6">
        <p className="text-gray-500">올바르지 않은 영화 번호예요!!</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="mx-auto w-[1440px] max-w-full px-20 py-6">
        <p className="text-gray-500">불러오는 중...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="mx-auto w-[1440px] max-w-full px-20 py-6">
        <p className="text-red-500">{errorMessage}</p>
      </main>
    );
  }

  if (!movie) {
    return null;
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <main className="mx-auto w-[1440px] max-w-full">
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt=""
          aria-hidden="true"
          className="h-[400px] w-full object-cover"
        />
      ) : (
        <div className="flex h-[400px] w-full items-center justify-center bg-gray-200 text-sm text-gray-400">
          이미지 없음
        </div>
      )}

      <div className="flex flex-col gap-4 px-20 py-10">
        <Link to="/" className="text-sm text-gray-500 hover:underline">
          ← 영화 목록
        </Link>

        <div className="flex gap-8">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="w-64 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="flex w-64 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-400">
              이미지 없음
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="m-0 text-3xl font-bold text-gray-900">
                {movie.title}
              </h1>
              <BookmarkButton movieId={movie.id} />
            </div>
            <p className="m-0 text-gray-500">{movie.original_title}</p>
            <p className="m-0 text-sm text-gray-500">{movie.release_date}</p>
            <p className="m-0 text-sm text-gray-500">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="m-0 text-sm text-gray-500">
              {formatRuntime(movie.runtime)}
            </p>
            <h2 className="m-0 text-lg font-semibold text-gray-800">
              {movie.tagline}
            </h2>
            <p className="m-0 text-base text-gray-700">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
}