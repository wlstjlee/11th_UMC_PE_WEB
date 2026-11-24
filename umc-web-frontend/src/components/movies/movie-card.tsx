import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../bookmark-button";
import { getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  return (
    <li className="flex h-[318px] flex-col items-start gap-1">
      <div className="relative aspect-[7/8] w-full overflow-hidden rounded-lg bg-gray-200">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block h-full w-full"
        >
          {backdropUrl ? (
            <img
              className="block h-full w-full object-cover"
              src={backdropUrl}
              alt={`${movie.title} 이미지`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              이미지 없음
            </div>
          )}
        </Link>

        <BookmarkButton movieId={movie.id} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="m-0 truncate text-[15px] font-semibold text-gray-900">
          {movie.title}
        </h3>
        <p className="m-0 text-[13px] text-gray-500">{movie.release_date}</p>
      </div>
    </li>
  );
}