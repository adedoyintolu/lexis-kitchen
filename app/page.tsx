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
      <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {mainNav.map((nav) => {
          const imageProps = {
            src: nav.background,
            alt: nav.title,
            fill: true,
            className: "w-full h-full object-cover",
            placeholder: "blur" as const,
          };

          const overlay = (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 hover:bg-black/40 transition-colors">
              <span className="font-bold text-xl md:text-3xl text-center text-white">
                {nav.title}
              </span>
            </div>
          );

          const content = (
            <>
              <Image {...imageProps} />
              {overlay}
            </>
          );

          const className =
            "relative w-full h-48 md:h-48 3xl:h-66 flex rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow";

          return nav.isExternal ? (
            <a
              href={nav.href}
              key={nav.title}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              {content}
            </a>
          ) : (
            <Link href={nav.href} key={nav.title} className={className}>
              {content}
            </Link>
          );
        })}
      </FadeIn>
    </div>
  );
}
