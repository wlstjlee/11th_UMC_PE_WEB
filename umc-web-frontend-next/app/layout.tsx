import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "UMCine",
  description: "TMDB 영화를 찾아보고 즐겨찾기와 평점을 남겨요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-[#f6f7f9]">
            <Header />
            <div className="flex-1">{children}</div>
            <footer className="flex items-center justify-end gap-2 px-20 py-4 text-xs text-gray-400">
              <span>
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
