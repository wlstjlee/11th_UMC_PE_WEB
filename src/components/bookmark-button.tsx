import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  className?: string;
}

export function BookmarkButton({ movieId, className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

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
      onClick={() => toggleBookmark(movieId)}
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
