import { useNavigate } from "@tanstack/react-router";
import { useFavoritesQuery } from "../hooks/use-favorites-query";
import { useToggleFavoriteMutation } from "../hooks/use-toggle-favorite-mutation";
import { useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  className?: string;
}

export function BookmarkButton({ movieId, className }: BookmarkButtonProps) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoritesQuery = useFavoritesQuery();
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const isBookmarked = favoritesQuery.data?.includes(movieId) ?? false;

  const handleClick = () => {
    if (!accessToken) {
      navigate({ to: "/login" });
      return;
    }
    if (toggleFavoriteMutation.isPending) return;

    toggleFavoriteMutation.mutate({ movieId, isFavorite: isBookmarked });
  };

  return (
    <button
      type="button"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md",
        isBookmarked ? "bg-blue-600" : "bg-black",
        className,
      )}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      onClick={handleClick}
    >
      <img
        className="h-6 w-6 brightness-0 invert"
        src={
          isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"
        }
        alt=""
        aria-hidden="true"
      />
    </button>
  );
}
