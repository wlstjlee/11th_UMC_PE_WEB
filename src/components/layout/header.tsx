import { Link } from "@tanstack/react-router";
import "../header.css";

export function Header() {
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
        <span className="header__nav-item">내 정보</span>
      </nav>

      <div className="header__actions">
        <button type="button" className="header__search-button" aria-label="검색">
          <img src="/icons/search.svg" alt="" aria-hidden="true" />
        </button>
        <button type="button" className="header__login-button">
          로그인
        </button>
      </div>
    </header>
  );
}