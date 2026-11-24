import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRating } from "../api/ratings/delete-rating";
import type { Rating } from "../api/ratings/models";

export function useDeleteRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ratingId: number) => deleteRating(ratingId),
    onSuccess: (_data, ratingId) => {
      queryClient.setQueryData<Rating[]>(["ratings", "my"], (prev = []) =>
        prev.filter((rating) => rating.ratingId !== ratingId),
      );
      alert("평점을 삭제했어요.");
    },
    onError: () => {
      alert("평점 삭제에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
