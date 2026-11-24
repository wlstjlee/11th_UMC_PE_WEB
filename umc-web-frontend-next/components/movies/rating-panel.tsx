"use client";

import { useEffect, useState } from "react";
import { useMyRatingsQuery } from "@/hooks/use-my-ratings-query";
import { useSaveRatingMutation } from "@/hooks/use-save-rating-mutation";
import { useDeleteRatingMutation } from "@/hooks/use-delete-rating-mutation";
import { cn } from "@/utils/cn";

interface RatingPanelProps {
  movieId: number;
}

const SCORES = [1, 2, 3, 4, 5];

export function RatingPanel({ movieId }: RatingPanelProps) {
  const ratingsQuery = useMyRatingsQuery();
  const saveRatingMutation = useSaveRatingMutation();
  const deleteRatingMutation = useDeleteRatingMutation();

  const existingRating = ratingsQuery.data?.find((rating) => rating.movieId === movieId) ?? null;

  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");

  // 이미 남긴 평점이 있으면 별점/후기를 그 값으로 채워서 수정 모드로 시작
  useEffect(() => {
    setScore(existingRating?.score ?? 0);
    setComment(existingRating?.comment ?? "");
  }, [existingRating]);

  const isPending = saveRatingMutation.isPending || deleteRatingMutation.isPending;
  const canSave = score > 0 && !isPending;

  const handleSave = () => {
    if (!canSave) return;

    saveRatingMutation.mutate({
      ratingId: existingRating?.ratingId ?? null,
      movieId,
      score,
      comment: comment.trim(),
    });
  };

  const handleDelete = () => {
    if (!existingRating || isPending) return;

    deleteRatingMutation.mutate(existingRating.ratingId);
  };

  return (
    <aside className="flex w-[360px] flex-col items-start gap-2 py-0 pb-[41px] pl-[30px]">
      <h2 className="m-0 w-full text-[21px] leading-[25px] font-bold tracking-[-0.63px] text-[#17191E]">
        내 평점
      </h2>
      <p className="m-0 w-full text-xs leading-[14px] text-[#969DA8]">
        별점은 필수, 후기는 선택이에요.
      </p>

      <div className="flex w-full gap-1">
        {SCORES.map((value) => {
          const isFilled = value <= score;

          return (
            <button
              key={value}
              type="button"
              disabled={isPending}
              onClick={() => setScore(value)}
              aria-label={`${value}점`}
              aria-pressed={isFilled}
              className={cn(
                "box-border flex h-[38px] w-[38px] items-center justify-center rounded-lg border bg-white px-[6px] py-[1px]",
                isFilled ? "border-[#2563EB]" : "border-[#E3E6EB]",
                isPending && "cursor-not-allowed opacity-50",
              )}
            >
              <img
                src={isFilled ? "/icons/star.svg" : "/icons/star-outline.svg"}
                alt=""
                aria-hidden="true"
                className="h-6 w-6"
              />
            </button>
          );
        })}
      </div>

      <textarea
        id="review-text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isPending}
        placeholder="영화를 보고 느낀 점을 남겨보세요."
        className="box-border h-[102px] w-full resize-none rounded-lg border border-[#E3E6EB] bg-white px-3 py-4 text-[13px] leading-5 text-[#17191E] outline-none placeholder:text-[#969DA8] disabled:cursor-not-allowed"
      />

      <button
        id="save-rating"
        type="button"
        disabled={!canSave}
        onClick={handleSave}
        className="box-border flex h-[42px] w-full items-center justify-center rounded-lg bg-[#17191E] text-sm leading-[17px] font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saveRatingMutation.isPending ? "저장 중" : "평점 저장"}
      </button>

      {existingRating && (
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="text-xs leading-[14px] font-extrabold text-[#D92D20] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleteRatingMutation.isPending ? "삭제 중" : "평점 삭제"}
        </button>
      )}
    </aside>
  );
}
