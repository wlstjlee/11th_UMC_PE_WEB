import { Suspense } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { getMovieDetailOnServer } from "@/api/movies/server/get-movie-detail";
import { BookmarkButton } from "@/components/bookmark-button";
import { FavoriteButton } from "@/components/movies/favorite-button";
import { RatingPanel } from "@/components/movies/rating-panel";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "@/utils/movies/tmdb-image";

function formatRuntime(runtime: number | null) {
  if (runtime == null) {
    return "상영 시간 정보가 없어요.";
  }
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}시간 ${minutes}분`;
}

export default function MovieDetailPage({
  params,
}: PageProps<"/movies/[movieId]">) {
  return (
    <Suspense
      fallback={<MovieDetailMessage>불러오는 중...</MovieDetailMessage>}
    >
      <MovieDetail params={params} />
    </Suspense>
  );
}

async function MovieDetail({
  params,
}: Pick<PageProps<"/movies/[movieId]">, "params">) {
  const { movieId: movieIdParam } = await params;
  const movieId = Number(movieIdParam);

  if (!Number.isInteger(movieId) || movieId <= 0) {
    return (
      <MovieDetailMessage>올바르지 않은 영화 번호예요!!</MovieDetailMessage>
    );
  }

  const movie = await getMovieDetailOnServer(movieId);

  if (!movie) {
    return (
      <MovieDetailMessage className="text-red-500">
        영화를 찾을 수 없어요.
      </MovieDetailMessage>
    );
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
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← 영화 목록
        </Link>

        <div className="flex items-start gap-3">
          <h1 className="m-0 text-3xl font-bold text-gray-900">
            {movie.title}
          </h1>
          <BookmarkButton movieId={movie.id} />
        </div>
        <p className="m-0 text-gray-500">{movie.original_title}</p>
        <p className="m-0 text-sm text-gray-500">
          {movie.release_date} ·{" "}
          {movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
          {formatRuntime(movie.runtime)}
        </p>
      </div>

      <div className="flex w-full items-start gap-8 px-20 py-6">
        <div className="h-[286px] w-[200px] shrink-0 overflow-hidden rounded-[10px] bg-[#F6F7F9] shadow-[0px_12px_30px_rgba(12,15,20,0.12)]">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              이미지 없음
            </div>
          )}
        </div>

        <section className="flex w-[656px] flex-col items-start gap-3">
          <h2 className="m-0 w-full text-[21px] leading-[25px] font-bold tracking-[-0.63px] text-[#17191E]">
            {movie.tagline || movie.title}
          </h2>
          <p className="m-0 w-full text-sm leading-6 text-[#606774]">
            {movie.overview}
          </p>

          <FavoriteButton movieId={movie.id} />
        </section>

        <RatingPanel movieId={movie.id} />
      </div>
    </main>
  );
}

function MovieDetailMessage({
  className = "text-gray-500",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-[1440px] max-w-full px-20 py-6">
      <p className={className}>{children}</p>
    </main>
  );
}
