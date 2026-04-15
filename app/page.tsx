import { FadeIn } from "@/components/common/fade-in";
import { SectionHeading } from "@/components/layout/section-heading";
import { homepageSeo } from "@/data/inquiry";
import { mainNav } from "@/data/main-nav";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: homepageSeo.title,
  description: homepageSeo.description,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto py-10">
      <SectionHeading
        eyebrow="Inquiry"
        title="Select an option below to get started"
        description="Whether you want to book a food tasting, explore our menu, or review our pricing, we have you covered. Click on any of the options below to learn more and take the next step towards an unforgettable catering experience with Lexi's Kitchen."
      />

      <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {mainNav.map((nav) =>
          nav.isExternal ? (
            <a
              href={nav.href}
              key={nav.title}
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-2xl h-150 relative"
            >
              <Image
                src={nav.background}
                alt={nav.title}
                className="w-full h-full object-cover rounded-2xl"
                layout="fill"
                placeholder="blur"
              />
              <div className="absolute top-130 bottom-0 left-0 right-0 flex items-center justify-center bg-danger rounded-b-2xl">
                <span className="font-bold font-display text-4xl text-center text-white">
                  {nav.title}
                </span>
              </div>
            </a>
          ) : (
            <Link
              href={nav.href}
              key={nav.title}
              className="w-full rounded-2xl h-150 relative"
            >
              <Image
                src={nav.background}
                alt={nav.title}
                className="w-full h-full object-cover rounded-2xl"
                placeholder="blur"
              />
              <div className="absolute top-130 bottom-0 left-0 right-0 flex items-center justify-center bg-danger rounded-b-2xl">
                <span className="font-bold font-display text-4xl text-center text-white">
                  {nav.title}
                </span>
              </div>
            </Link>
          ),
        )}
      </FadeIn>
    </div>
  );
}
