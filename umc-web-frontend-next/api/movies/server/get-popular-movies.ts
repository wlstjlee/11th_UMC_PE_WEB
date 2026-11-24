import { cacheLife } from "next/cache";
import { getMoviesWithFetch } from "../get-movies-with-fetch";
import type { TmdbMovieListResponse } from "../models";

// Server Component에서 바로 호출해요. page가 캐시 키가 되어 페이지별로 따로 캐시돼요.
export async function getPopularMovies(
  page: number,
): Promise<TmdbMovieListResponse> {
  "use cache";
  cacheLife("hours");

  return getMoviesWithFetch(page);
}
