import { SectionHeading } from "@/components/section-heading";
import { FadeIn, SiteFooter, SiteHeader } from "@/components/site-sections";
import { menuCollections } from "@/data/inquiry";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description:
    "Explore Lexi's Kitchen menu collections and request the full menu through WhatsApp.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-[4.5rem]">
        <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
          <SectionHeading
            eyebrow="Menu overview"
            title="A preview of the collections behind the inquiry flow"
            description="Your live process sends the full menu through WhatsApp. This page keeps that behavior while still giving guests a curated preview of the food categories available."
          />
          <div className="grid gap-4 rounded-[1.75rem] p-[1.4rem] mb-6 border border-[color:var(--color-line)] bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
            <div>
              <p className="m-0 text-[color:var(--color-accent-soft)] uppercase tracking-[0.16em] text-[0.75rem] font-bold">
                Full menu delivery
              </p>
              <h2 className="mt-1 mb-0 font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,3.4rem)] leading-[0.95] tracking-[-0.03em]">
                Request the complete menu directly on WhatsApp
              </h2>
            </div>
            <Link
              className="inline-flex self-start items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-[color:var(--color-accent)] text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813]"
              href="https://wa.me/15551234567"
            >
              Open WhatsApp
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {menuCollections.map((collection, index) => (
              <FadeIn
                key={collection.slug}
                className="rounded-[1.45rem] p-[1.2rem] border border-[color:var(--color-line)] bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
                delay={index * 0.06}
              >
                <div className="grid gap-[0.7rem] mb-4">
                  <p className="m-0 text-[color:var(--color-accent-soft)] uppercase tracking-[0.16em] text-[0.75rem] font-bold">
                    {collection.label}
                  </p>
                  <h2 className="m-0 font-[family-name:var(--font-display)] text-[clamp(1.6rem,4vw,2.2rem)] leading-[0.95] tracking-[-0.03em]">
                    {collection.title}
                  </h2>
                  <p className="text-[color:var(--color-text-soft)] leading-[1.7]">
                    {collection.description}
                  </p>
                </div>
                <ul className="m-0 p-0 list-none grid gap-[0.7rem]">
                  {collection.items.map((item) => (
                    <li key={item.name} className="grid gap-[0.35rem]">
                      <div className="flex items-center justify-between gap-3 font-bold">
                        <span>{item.name}</span>
                        {item.tag ? (
                          <span className="px-[0.55rem] py-[0.28rem] rounded-full bg-[color:var(--color-surface-muted)] text-[color:var(--color-text-soft)] text-[0.72rem]">
                            {item.tag}
                          </span>
                        ) : null}
                      </div>
                      <p className="m-0 text-[color:var(--color-text-soft)] leading-[1.7]">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
