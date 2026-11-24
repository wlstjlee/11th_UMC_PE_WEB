"use client";

import { useRouter } from "next/navigation";
import { useFavoritesQuery } from "@/hooks/use-favorites-query";
import { useToggleFavoriteMutation } from "@/hooks/use-toggle-favorite-mutation";
import { useAuthStore } from "@/stores/auth-store";

interface FavoriteButtonProps {
  movieId: number;
}

export function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoritesQuery = useFavoritesQuery();
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const isFavorite = favoritesQuery.data?.includes(movieId) ?? false;

  const handleToggleFavorite = () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    if (toggleFavoriteMutation.isPending) return;

    toggleFavoriteMutation.mutate({ movieId, isFavorite });
  };

  return (
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
  );
}
