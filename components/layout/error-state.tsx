"use client";

import Link from "next/link";

type ErrorStateProps = {
  title: string;
  description: string;
  detail?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title,
  description,
  detail,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="grid gap-[0.9rem] rounded-[1.3rem] border border-[rgba(127,47,47,0.25)] bg-[rgba(255,255,255,0.72)] p-[1.2rem] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
      <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
        Error state
      </p>
      <h2 className="m-0 text-[1.2rem]">{title}</h2>
      <div className="text-text-soft leading-[1.7]">{description}</div>
      {detail ? (
        <div className="text-text-soft leading-[1.7]">{detail}</div>
      ) : null}
      <div className="flex flex-wrap gap-[0.7rem]">
        {onRetry ? (
          <button
            className="inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-accent text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813]"
            type="button"
            onClick={onRetry}
          >
            Try again
          </button>
        ) : null}
        <Link
          className="inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-line-strong bg-transparent text-text transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)]"
          href="/"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
