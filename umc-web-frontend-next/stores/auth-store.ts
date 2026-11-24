import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { decodeAccessToken } from "../utils/auth/decode-access-token";

export const ACCESS_TOKEN_COOKIE = "umcine-access-token";

const COOKIE_OPTIONS = "path=/; samesite=lax";

// proxy.ts는 localStorage를 읽을 수 없어서, 토큰을 쿠키에도 함께 써서 서버가 로그인 여부만 보게 해요.
// 쿠키가 토큰보다 오래 남으면 이미 만료된 토큰으로도 proxy를 통과하니 수명을 토큰에 맞춰요.
function syncAccessTokenCookie(accessToken: string | null) {
  if (typeof document === "undefined") return;

  if (!accessToken) {
    document.cookie = `${ACCESS_TOKEN_COOKIE}=; ${COOKIE_OPTIONS}; max-age=0`;
    return;
  }

  const expiresAt = decodeAccessToken(accessToken)?.exp;

  if (expiresAt === undefined) {
    // exp를 못 읽으면 적어도 브라우저를 닫을 때까지만 남겨요.
    document.cookie = `${ACCESS_TOKEN_COOKIE}=${accessToken}; ${COOKIE_OPTIONS}`;
    return;
  }

  const maxAge = Math.max(0, expiresAt - Math.floor(Date.now() / 1000));
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${accessToken}; ${COOKIE_OPTIONS}; max-age=${maxAge}`;
}

interface AuthStore {
  accessToken: string | null;
  // localStorage 복원이 끝났는지. 복원 전에는 토큰이 없는 것과 구분할 수 없어요.
  isHydrated: boolean;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      isHydrated: false,
      setAccessToken: (accessToken) => {
        syncAccessTokenCookie(accessToken);
        set({ accessToken });
      },
    }),
    {
      name: "umcine-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
      // 서버 HTML과 첫 클라이언트 렌더를 맞추기 위해 복원을 마운트 이후로 미뤄요.
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        syncAccessTokenCookie(state?.accessToken ?? null);
        useAuthStore.setState({ isHydrated: true });
      },
    },
  ),
);
