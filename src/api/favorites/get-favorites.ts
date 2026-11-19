import { authApi } from "../auth-api";

interface GetFavoritesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: { movieId: number }[];
}

export async function getFavorites(): Promise<number[]> {
  const response = await authApi.get("favorites").json<GetFavoritesResponse>();
  return response.result.map((favorite) => favorite.movieId);
}
