import Button from "@/components/common/button";
import { FadeIn } from "@/components/common/fade-in";
import { SectionHeading } from "@/components/layout/section-heading";
import { menuCategory } from "@/data/menu";
import { buildMetadata } from "@/lib/metadata";
import { routes } from "@/routes";
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
    <div className="min-h-screen py-18">
      <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
        <SectionHeading
          eyebrow="Menu overview"
          title="Explore Our Menu Collections"
          description="Our menu is organized into collections that group items by category and service style. Each collection includes a curated selection of items that are popular for catered events"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {menuCategory.map((collection, index) => (
            <FadeIn
              key={collection.slug}
              className="rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
              delay={index * 0.06}
            >
              <div className="grid gap-[0.7rem] mb-4">
                <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
                  {collection.label}
                </p>
                <h2 className="m-0 font-display text-[clamp(1.6rem,4vw,2.2rem)] leading-[0.95] tracking-[-0.03em]">
                  {collection.title}
                </h2>
                <div className="text-text-soft leading-[1.7]">
                  {collection.description}
                </div>
              </div>
              <ul className="m-0 p-0 list-none grid gap-[0.7rem] md:grid-cols-2 grid-cols-1">
                {collection.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-3 font-medium p-3 capitalize rounded-lg border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_10px_30px_rgba(49,40,33,0.06)]"
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
        <div className="flex items-center flex-wrap gap-5 md:flex-nowrap w-full! mt-10">
          <Link href={routes.home} className="w-full!">
            <Button className="w-full!">Go to homepage</Button>
          </Link>
          <Link href={routes.inquiry} className="w-full!">
            <Button variant="primary" className="w-full!">
              Start Event Inquiry
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
