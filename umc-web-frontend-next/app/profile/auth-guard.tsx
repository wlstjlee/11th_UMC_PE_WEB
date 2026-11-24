"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

// 기존 _authenticated 라우트의 beforeLoad 가드예요.
// 로그아웃 상태는 proxy.ts가 쿠키를 보고 서버에서 먼저 막고,
// 쿠키만 남고 localStorage 토큰이 없는 경우를 여기서 받아내요.
export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (isHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [isHydrated, accessToken, router]);

  // 복원 전에는 서버 HTML과 똑같이 비워 둬요.
  // 여기서 내 정보를 미리 그리면 서버("-")와 클라이언트(실제 값)가 어긋나 하이드레이션이 깨져요.
  if (!isHydrated || !accessToken) {
    return null;
  }

  return children;
}
