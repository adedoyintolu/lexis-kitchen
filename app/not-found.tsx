import { SiteHeader } from "@/components/site-sections";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-[4.5rem]">
        <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
          <div className="grid gap-[0.9rem] rounded-[1.3rem] border border-line bg-[rgba(255,255,255,0.72)] p-[1.2rem] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
            <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
              Not found
            </p>
            <h2 className="m-0 text-[1.2rem]">
              The page you requested is not available.
            </h2>
            <p className="text-text-soft leading-[1.7]">
              Use the links below to return to the inquiry, pricing, or menu
              experience.
            </p>
            <div className="flex flex-wrap gap-[0.7rem]">
              <Link
                className="inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-accent text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813]"
                href="/"
              >
                Back to inquiry
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-line-strong bg-transparent text-text transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)]"
                href="/pricing"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
