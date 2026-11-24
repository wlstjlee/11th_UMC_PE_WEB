import { useQuery } from "@tanstack/react-query";
import { getMyRatings } from "../api/ratings/get-my-ratings";
import { useAuthStore } from "../stores/auth-store";
import { decodeAccessToken } from "../utils/auth/decode-access-token";

export function useMyRatingsQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = accessToken ? decodeAccessToken(accessToken)?.sub : undefined;

  return useQuery({
    queryKey: ["ratings", "my"],
    queryFn: () => getMyRatings(memberId!),
    enabled: memberId !== undefined,
  });
}
