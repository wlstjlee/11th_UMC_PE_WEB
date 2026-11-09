import { Link } from "@tanstack/react-router";
import { Pagination } from "@/components/movies/pagination";

// TODO: 내 정보 조회 API 연동 전까지 사용하는 임시 데이터
const MOCK_PROFILE = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
};

const MOCK_FAVORITE_MOVIES = [
  { id: 1, title: "스파이더맨: 브랜드 뉴 데이", releaseDate: "2026.07.29" },
  { id: 2, title: "오디세이", releaseDate: "2026.08.05" },
  { id: 3, title: "미니언즈 & 몬스터즈", releaseDate: "2026.07.15" },
];

export function ProfilePage() {
  return (
    <main className="mx-auto flex w-[1440px] max-w-full flex-col items-start gap-7 px-20 py-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px] text-[#17191E]">
          내 정보
        </h1>
        <Link
          to="/profile/edit"
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
                {MOCK_PROFILE.nickname}
              </strong>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] leading-[13px] text-[#969DA8]">이메일</span>
              <strong className="text-sm leading-[17px] font-bold text-[#17191E]">
                {MOCK_PROFILE.email}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-4">
        <h2 className="m-0 w-full text-[17px] leading-5 font-bold text-[#17191E]">내 즐겨찾기</h2>

        <ul className="m-0 grid w-full list-none grid-cols-5 gap-6 p-0">
          {MOCK_FAVORITE_MOVIES.map((movie) => (
            <li key={movie.id} className="flex flex-col items-start gap-1">
              <div className="aspect-[7/8] w-full rounded-[10px] bg-[#F6F7F9]" />
              <div className="flex flex-col gap-0 pt-[5px]">
                <h3 className="m-0 truncate text-sm leading-[17px] font-extrabold text-[#17191E]">
                  {movie.title}
                </h3>
                <p className="m-0 text-xs leading-[14px] text-[#969DA8]">{movie.releaseDate}</p>
              </div>
            </li>
          ))}
        </ul>

        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      </section>
    </main>
  );
}
