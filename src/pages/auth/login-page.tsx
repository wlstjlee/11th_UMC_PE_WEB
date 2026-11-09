import { useState } from "react";
import { Link } from "@tanstack/react-router";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const handleChangeField = (key: DefaultFormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault();

    // 로그인 API 요청 추가 예정
  };

  return (
    <div className="flex min-h-[933px] w-full items-center justify-center">
      <form
        id="login-form"
        onSubmit={handleSubmit}
        noValidate
        className="flex w-[430px] flex-col items-start gap-4"
      >
        <h1 className="m-0 w-full text-[34px] leading-[41px] font-bold tracking-[-1.53px] text-[#17191E]">
          로그인
        </h1>

        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="login-email" className="w-full text-[13px] leading-4 font-extrabold text-[#17191E]">
            이메일
          </label>
          <div className="box-border flex w-full items-center gap-1 rounded-lg border border-[#E3E6EB] bg-white px-[13px] py-[14px]">
            <img src="/icons/mail.svg" alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => handleChangeField("email", e.target.value)}
              className="flex-1 border-none text-sm leading-[17px] text-[#17191E] outline-none placeholder:text-[#969DA8]"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="login-password" className="w-full text-[13px] leading-4 font-extrabold text-[#17191E]">
            비밀번호
          </label>
          <div className="box-border flex w-full items-center gap-1 rounded-lg border border-[#E3E6EB] bg-white px-[13px] py-[14px]">
            <img src="/icons/lock.svg" alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />
            <input
              id="login-password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(e) => handleChangeField("password", e.target.value)}
              className="flex-1 border-none text-sm leading-[17px] text-[#17191E] outline-none placeholder:text-[#969DA8]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="box-border flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] text-sm leading-[17px] font-extrabold text-white"
        >
          로그인
        </button>

        <div className="flex w-full items-end justify-center gap-1 pt-[5px]">
          <span className="text-[13px] leading-4 text-[#606774]">처음이신가요?</span>
          <Link to="/signup" className="text-xs leading-[14px] font-extrabold text-[#2563EB]">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
