"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { href: "/", label: "영화" },
  { href: "/search", label: "검색" },
  { href: "/profile", label: "내 정보" },
];

// 프리렌더 단계에서는 현재 경로를 알 수 없어서, 그때는 pathname 없이 그려요.
export function HeaderNavLinks({ pathname }: { pathname: string | null }) {
  return (
    <nav className="header__nav">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "header__nav-item",
            pathname === item.href && "header__nav-item--active",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function HeaderNav() {
  return <HeaderNavLinks pathname={usePathname()} />;
}
