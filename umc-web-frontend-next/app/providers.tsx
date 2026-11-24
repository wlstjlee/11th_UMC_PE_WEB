"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "@/stores/auth-store";

const ONE_MINUTE = 60 * 1000;

export function Providers({ children }: { children: ReactNode }) {
  // 요청마다 새로 만들되 클라이언트에서는 한 번만 만들어요.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: ONE_MINUTE } },
      }),
  );

  // skipHydration으로 미뤄 둔 localStorage 복원을 마운트 후에 실행해요.
  useEffect(() => {
    void useAuthStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
