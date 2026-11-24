"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex w-[1440px] max-w-full flex-col items-start gap-3 px-20 py-6">
      <p className="m-0 text-red-500">정보를 불러오지 못했어요.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-extrabold text-white"
      >
        다시 시도
      </button>
    </main>
  );
}
