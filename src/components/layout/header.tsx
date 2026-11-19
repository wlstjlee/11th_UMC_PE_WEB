import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";
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
      <div className="header__logo">
        <img src="/icons/movie.svg" alt="" aria-hidden="true" />
        UMCine
      </div>

      <nav className="header__nav">
        <Link
          to="/"
          className="header__nav-item"
          activeProps={{ className: "header__nav-item header__nav-item--active" }}
        >
          영화
        </Link>
        <Link
          to="/search"
          className="header__nav-item"
          activeProps={{ className: "header__nav-item header__nav-item--active" }}
        >
          검색
        </Link>
        <Link
          to="/profile"
          className="header__nav-item"
          activeProps={{ className: "header__nav-item header__nav-item--active" }}
        >
          내 정보
        </Link>
      </nav>

      <div className="header__actions">
        <button type="button" className="header__search-button" aria-label="검색">
          <img src="/icons/search.svg" alt="" aria-hidden="true" />
        </button>
        {!accessToken ? (
          <Link to="/login" className="header__login-button">
            로그인
          </Link>
        ) : meQuery.isLoading ? (
          <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
        ) : (
          <Link to="/profile" className="header__login-button">
            마이페이지
          </Link>
        )}
      </div>
    </header>
  );
}