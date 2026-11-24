"use client";

import { useEffect, useState } from "react";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";
import { useMeQuery } from "@/hooks/use-me-query";
import { useUpdateMeMutation } from "@/hooks/use-update-me-mutation";

export default function ProfileEditPage() {
  const meQuery = useMeQuery();
  const updateMeMutation = useUpdateMeMutation();
  const [nickname, setNickname] = useState("");

  // 조회된 내 정보로 닉네임 입력값 초기화
  useEffect(() => {
    if (meQuery.data) {
      setNickname(meQuery.data.nickname);
    }
  }, [meQuery.data]);

  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const trimmedNickname = nickname.trim();
  const isNicknameValid =
    trimmedNickname.length >= 2 && trimmedNickname.length <= 12;

  const handleCheckDuplicate = async () => {
    if (!isNicknameValid || isCheckingNickname) return;

    setIsCheckingNickname(true);
    try {
      const response = await checkNicknameDuplicate(trimmedNickname);
      alert(
        response.available
          ? "사용할 수 있는 닉네임이에요."
          : "이미 사용 중인 닉네임이에요.",
      );
    } catch {
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault();
    if (!isNicknameValid || updateMeMutation.isPending) return;

    updateMeMutation.mutate({ nickname: trimmedNickname });
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
          disabled={!isNicknameValid || updateMeMutation.isPending}
          className="box-border flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm leading-[17px] font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateMeMutation.isPending ? "저장 중" : "변경사항 저장"}
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
                disabled={isCheckingNickname}
                className="flex-1 border-none text-sm leading-[17px] text-[#17191E] outline-none placeholder:text-[#969DA8]"
              />
              <button
                id="profile-nickname-check"
                type="button"
                disabled={!isNicknameValid || isCheckingNickname}
                onClick={handleCheckDuplicate}
                className="shrink-0 text-xs leading-[14px] font-extrabold text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCheckingNickname ? "확인 중" : "중복 확인"}
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
                value={meQuery.data?.email ?? ""}
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
