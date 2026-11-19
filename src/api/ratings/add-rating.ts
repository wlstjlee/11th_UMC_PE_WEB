import { authApi } from "../auth-api";
import type { Rating } from "./models";

export interface AddRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

interface AddRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

export async function addRating(body: AddRatingRequest): Promise<Rating> {
  const response = await authApi
    .post("ratings", { json: body })
    .json<AddRatingResponse>();
  return response.result;
}
