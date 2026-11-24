import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRating } from "../api/ratings/add-rating";
import { updateRating } from "../api/ratings/update-rating";
import type { Rating } from "../api/ratings/models";

interface SaveRatingVariables {
  ratingId: number | null;
  movieId: number;
  score: number;
  comment: string;
}

export function useSaveRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ratingId, ...body }: SaveRatingVariables) =>
      ratingId === null
        ? addRating(body)
        : updateRating({ ratingId, ...body }),
    onSuccess: (savedRating) => {
      queryClient.setQueryData<Rating[]>(["ratings", "my"], (prev = []) => {
        const exists = prev.some((rating) => rating.ratingId === savedRating.ratingId);
        return exists
          ? prev.map((rating) => (rating.ratingId === savedRating.ratingId ? savedRating : rating))
          : [...prev, savedRating];
      });
      alert("평점을 저장했어요.");
    },
    onError: () => {
      alert("평점 저장에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
