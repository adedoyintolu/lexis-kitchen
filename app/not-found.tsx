import Button from "@/components/common/button";
import { mainNav } from "@/data/main-nav";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen">
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
              Continue with any of the links below
            </p>
            <div className="flex flex-wrap gap-[0.7rem]">
              <Link href={mainNav[0].href}>
                <Button variant="primary">{mainNav[0].title}</Button>
              </Link>
              <Link href="/">
                <Button variant="secondary">Back to home page</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
