import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "../api/favorites/add-favorite";
import { removeFavorite } from "../api/favorites/remove-favorite";

interface ToggleFavoriteVariables {
  movieId: number;
  isFavorite: boolean;
}

export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ movieId, isFavorite }: ToggleFavoriteVariables) =>
      isFavorite ? removeFavorite(movieId) : addFavorite(movieId),
    onSuccess: (_data, { movieId, isFavorite }) => {
      // 목록을 다시 조회하지 않고, 토글한 movieId만 캐시에서 직접 추가/제거
      queryClient.setQueryData<number[]>(["favorites"], (prev = []) =>
        isFavorite
          ? prev.filter((id) => id !== movieId)
          : [...prev, movieId],
      );
    },
    onError: () => {
      alert("즐겨찾기 처리에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
