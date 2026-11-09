import { useState } from "react";

// TODO: 내 정보 조회 API 연동 전까지 사용하는 임시 데이터
const MOCK_PROFILE = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
};

export function ProfileEditPage() {
  const [nickname, setNickname] = useState(MOCK_PROFILE.nickname);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault();

    // 내 정보 수정 API 요청 추가 예정
  };

  const handleDeleteAccount = () => {
    // 회원 탈퇴 확인 다이얼로그 연결 예정
  };

  return (
    <main className="mx-auto flex w-[1440px] max-w-full flex-col items-start gap-8 px-20 py-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px] text-[#17191E]">
            내 정보 수정
          </h1>
          <p className="m-0 text-sm leading-[22px] text-[#606774]">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>
        <button
          type="submit"
          form="profile-form"
          className="box-border flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm leading-[17px] font-extrabold text-white"
        >
          변경사항 저장
        </button>
      </div>

      <form id="profile-form" onSubmit={handleSubmit} noValidate className="flex w-full items-start gap-11">
        <div className="flex w-[640px] flex-col items-center justify-center gap-1">
          <span className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#E3E6EB]">
            <img src="/icons/person.svg" alt="" aria-hidden="true" className="h-12 w-12" />
          </span>
          <p className="m-0 text-[15px] leading-[18px] font-bold text-[#17191E]">프로필 이미지</p>
          <p className="m-0 text-[11px] leading-[13px] text-[#969DA8]">선택 사항 · 최대 5MB</p>
        </div>

        <div className="flex w-[640px] flex-col items-start gap-[17px]">
          <div className="flex w-full flex-col items-start gap-2">
            <label htmlFor="profile-nickname" className="w-full text-[13px] leading-4 font-extrabold text-[#17191E]">
              닉네임
            </label>
            <div className="box-border flex w-full items-center gap-2 rounded-lg border border-[#E3E6EB] bg-white px-[13px] py-[14px]">
              <input
                id="profile-nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="flex-1 border-none text-sm leading-[17px] text-[#17191E] outline-none placeholder:text-[#969DA8]"
              />
              <button
                id="profile-nickname-check"
                type="button"
                className="shrink-0 text-xs leading-[14px] font-extrabold text-[#2563EB]"
              >
                중복 확인
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <label htmlFor="profile-email" className="text-[13px] leading-4 font-extrabold text-[#17191E]">
              이메일
            </label>
            <div className="box-border flex w-full items-center justify-center rounded-lg border border-[#E3E6EB] bg-white px-[13px] py-[14px]">
              <input
                id="profile-email"
                type="email"
                value={MOCK_PROFILE.email}
                readOnly
                disabled
                className="flex-1 border-none text-sm leading-[17px] text-[#17191E] outline-none disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </form>

      <section className="box-border flex w-full items-center justify-between gap-2 rounded-[10px] border border-[#D92D20] bg-[#D92D20]/10 p-5">
        <div className="flex flex-col items-start gap-1">
          <h3 className="m-0 text-sm leading-[17px] font-bold text-[#D92D20]">회원 탈퇴</h3>
          <p className="m-0 text-[11px] leading-4 text-[#D92D20]">
            탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
          </p>
        </div>
        <button
          id="open-delete-dialog"
          type="button"
          onClick={handleDeleteAccount}
          className="box-border flex h-[42px] shrink-0 items-center justify-center rounded-lg border border-[#D92D20] bg-white px-4 text-sm leading-[17px] font-extrabold text-[#D92D20]"
        >
          회원 탈퇴
        </button>
      </section>
    </main>
  );
}
