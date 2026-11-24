"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";
import { HeaderNav, HeaderNavLinks } from "./header-nav";
import "../header.css";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img src="/icons/movie.svg" alt="" aria-hidden="true" />
          UMCine
        </div>

        <Suspense fallback={<HeaderNavLinks pathname={null} />}>
          <HeaderNav />
        </Suspense>

        <div className="header__actions">
          <Link href="/search" className="header__search-button" aria-label="검색">
            <img src="/icons/search.svg" alt="" aria-hidden="true" />
          </Link>
          {!accessToken ? (
            <Link href="/login" className="header__login-button">
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : (
            <Link href="/profile" className="header__login-button">
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
