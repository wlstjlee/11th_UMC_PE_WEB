import { cacheLife } from "next/cache";
import { env } from "@/config/env";
import type { TmdbMovieDetail } from "../models";

// 없는 영화는 null로 알려주고, 그 밖의 실패는 error.tsx가 받도록 그대로 던져요.
export async function getMovieDetailOnServer(
  movieId: number,
): Promise<TmdbMovieDetail | null> {
  "use cache";
  cacheLife("hours");

  const searchParams = new URLSearchParams({ language: "ko-KR" });
  const response = await fetch(
    `${env.tmdbApiBaseUrl}/movie/${movieId}?${searchParams}`,
    {
      headers: { Authorization: `Bearer ${env.tmdbAccessToken}` },
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`영화 정보 요청에 실패했어요: ${response.status}`);
  }

  return response.json();
}
