import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookmarkButton } from "../../components/bookmark-button";
import { RatingPanel } from "../../components/movies/rating-panel";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";
import { useFavoritesQuery } from "../../hooks/use-favorites-query";
import { useToggleFavoriteMutation } from "../../hooks/use-toggle-favorite-mutation";
import { useAuthStore } from "../../stores/auth-store";

function formatRuntime(runtime: number | null) {
  if (runtime == null) {
    return "상영 시간 정보가 없어요.";
  }
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}시간 ${minutes}분`;
}

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
  });

  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoritesQuery = useFavoritesQuery();
  const toggleFavoriteMutation = useToggleFavoriteMutation();
  const isFavorite = favoritesQuery.data?.includes(movieId) ?? false;

  const handleToggleFavorite = () => {
    if (!accessToken) {
      navigate({ to: "/login" });
      return;
    }
    if (toggleFavoriteMutation.isPending) return;

    toggleFavoriteMutation.mutate({ movieId, isFavorite });
  };

  if (!isValidMovieId) {
    return (
      <main className="mx-auto w-[1440px] max-w-full px-20 py-6">
        <p className="text-gray-500">올바르지 않은 영화 번호예요!!</p>
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="mx-auto w-[1440px] max-w-full px-20 py-6">
        <p className="text-gray-500">불러오는 중...</p>
      </main>
    );
  }

  if (movieDetailQuery.isError) {
    return (
      <main className="mx-auto w-[1440px] max-w-full px-20 py-6">
        <p className="text-red-500">
          {getMovieDetailErrorMessage(movieDetailQuery.error)}
        </p>
      </main>
    );
  }

  const movie = movieDetailQuery.data;
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

        <div className="flex items-start gap-3">
          <h1 className="m-0 text-3xl font-bold text-gray-900">{movie.title}</h1>
          <BookmarkButton movieId={movie.id} />
        </div>
        <p className="m-0 text-gray-500">{movie.original_title}</p>
        <p className="m-0 text-sm text-gray-500">
          {movie.release_date} · {movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
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
          <p className="m-0 w-full text-sm leading-6 text-[#606774]">{movie.overview}</p>

          <button
            type="button"
            onClick={handleToggleFavorite}
            disabled={toggleFavoriteMutation.isPending}
            className="box-border flex h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 text-sm leading-[17px] font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <img
              src={isFavorite ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 brightness-0 invert"
            />
            {isFavorite ? "즐겨찾기됨" : "즐겨찾기"}
          </button>
        </section>

        <RatingPanel movieId={movie.id} />
      </div>
    </main>
  );
}