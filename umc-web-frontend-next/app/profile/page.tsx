"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { Pagination } from "@/components/movies/pagination";
import { BookmarkButton } from "@/components/bookmark-button";
import { useMeQuery } from "@/hooks/use-me-query";
import { useFavoritesQuery } from "@/hooks/use-favorites-query";
import { getMovieDetail } from "@/api/movies/get-movie-detail";
import { getTmdbBackdropUrl } from "@/utils/movies/tmdb-image";

export default function ProfilePage() {
  const meQuery = useMeQuery();
  const profile = meQuery.data;

  const favoritesQuery = useFavoritesQuery();
  const favoriteMovieIds = favoritesQuery.data ?? [];

  // 즐겨찾기한 영화 id마다 TMDB 상세 정보를 병렬로 조회
  const favoriteMovieQueries = useQueries({
    queries: favoriteMovieIds.map((movieId) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
    })),
  });

  const favoriteMovies = favoriteMovieQueries
    .map((query) => query.data)
    .filter((movie) => movie !== undefined);

  return (
    <main className="mx-auto flex w-[1440px] max-w-full flex-col items-start gap-7 px-20 py-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px] text-[#17191E]">
          내 정보
        </h1>
        <Link
          href="/profile/edit"
          className="box-border flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm leading-[17px] font-extrabold text-white"
        >
          정보 수정
        </Link>
      </div>

      <section className="box-border flex w-full flex-col items-start gap-4 border-y border-[#E3E6EB] py-3">
        <h2 className="m-0 w-full text-[17px] leading-5 font-bold text-[#17191E]">기본 정보</h2>
        <div className="flex w-full items-center gap-7">
          <span className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-[#E3E6EB]">
            <img src="/icons/person.svg" alt="" aria-hidden="true" className="h-12 w-12" />
          </span>

          <div className="flex items-start gap-7">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] leading-[13px] text-[#969DA8]">닉네임</span>
              <strong className="text-sm leading-[17px] font-bold text-[#17191E]">
                {profile?.nickname ?? "-"}
              </strong>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] leading-[13px] text-[#969DA8]">이메일</span>
              <strong className="text-sm leading-[17px] font-bold text-[#17191E]">
                {profile?.email ?? "-"}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-4">
        <h2 className="m-0 w-full text-[17px] leading-5 font-bold text-[#17191E]">내 즐겨찾기</h2>

        {favoritesQuery.isPending ? (
          <p className="text-sm text-[#969DA8]">불러오는 중...</p>
        ) : favoriteMovies.length === 0 ? (
          <p className="text-sm text-[#969DA8]">즐겨찾기한 영화가 없어요.</p>
        ) : (
          <>
            <ul className="m-0 grid w-full list-none grid-cols-5 gap-6 p-0">
              {favoriteMovies.map((movie) => {
                const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

                return (
                  <li key={movie.id} className="flex flex-col items-start gap-1">
                    <div className="relative aspect-[7/8] w-full overflow-hidden rounded-[10px] bg-[#F6F7F9]">
                      <Link
                        href={`/movies/${movie.id}`}
                        className="block h-full w-full"
                      >
                        {backdropUrl ? (
                          <img
                            className="block h-full w-full object-cover"
                            src={backdropUrl}
                            alt={`${movie.title} 이미지`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-[#969DA8]">
                            이미지 없음
                          </div>
                        )}
                      </Link>
                      <BookmarkButton movieId={movie.id} className="absolute right-3 top-3" />
                    </div>
                    <div className="flex flex-col gap-0 pt-[5px]">
                      <h3 className="m-0 truncate text-sm leading-[17px] font-extrabold text-[#17191E]">
                        {movie.title}
                      </h3>
                      <p className="m-0 text-xs leading-[14px] text-[#969DA8]">{movie.release_date}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
          </>
        )}
      </section>
    </main>
  );
}
