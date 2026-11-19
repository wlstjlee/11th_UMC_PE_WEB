import { authApi } from "../auth-api";
import type { Rating } from "./models";

// 이 엔드포인트는 다른 API와 달리 isSuccess 래퍼 없이 배열을 그대로 반환해요.
export function getMyRatings(memberId: string) {
  return authApi.get(`members/${memberId}/ratings`).json<Rating[]>();
}
