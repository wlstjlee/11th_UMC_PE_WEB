// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-[#f6f7f9]">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="flex items-center justify-end gap-2 px-20 py-4 text-xs text-gray-400">
        <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
      </footer>
    </div>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});