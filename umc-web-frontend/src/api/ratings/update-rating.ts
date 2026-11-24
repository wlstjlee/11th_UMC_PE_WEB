import { authApi } from "../auth-api";
import type { Rating } from "./models";

export interface UpdateRatingRequest {
  ratingId: number;
  score: number;
  comment: string;
}

interface UpdateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

export async function updateRating({
  ratingId,
  ...body
}: UpdateRatingRequest): Promise<Rating> {
  const response = await authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<UpdateRatingResponse>();
  return response.result;
}
