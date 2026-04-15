import {
  businessInfo,
  inquiryActions,
  pricingCategories,
  serviceStyles,
  timelineSteps,
} from "@/data/inquiry";
import Link from "next/link";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <div
      className={["fade-in", className].filter(Boolean).join(" ")}
      style={{ ["--delay" as string]: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-[rgba(245,241,234,0.84)] border-b border-[rgba(182,171,156,0.45)]">
      <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="grid gap-[0.2rem]"
          aria-label="Lexi's Kitchen home"
        >
          <strong className="text-[0.88rem] tracking-[0.14em] uppercase">
            Lexi&apos;s Kitchen
          </strong>
          <span className="text-text-soft text-[0.85rem]">
            Premium event catering
          </span>
        </Link>
        <nav
          className="hidden md:flex items-center gap-[1.2rem]"
          aria-label="Primary navigation"
        >
          <Link
            href="/#services"
            className="text-text-soft transition-colors duration-[180ms] ease-[ease] hover:text-text focus-visible:text-text"
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="text-text-soft transition-colors duration-[180ms] ease-[ease] hover:text-text focus-visible:text-text"
          >
            Pricing
          </Link>
          <Link
            href="/menu"
            className="text-text-soft transition-colors duration-[180ms] ease-[ease] hover:text-text focus-visible:text-text"
          >
            Menu
          </Link>
          <Link
            href={businessInfo.calendlyLink}
            className="text-text-soft transition-colors duration-[180ms] ease-[ease] hover:text-text focus-visible:text-text"
          >
            Food tasting
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function CtaGroup() {
  return (
    <div className="flex flex-wrap gap-3">
      {inquiryActions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={
            action.variant === "primary"
              ? "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-accent text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813]"
              : "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-line-strong bg-transparent text-text transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)]"
          }
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noreferrer" : undefined}
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}

export function InquiryHighlights() {
  const items = [
    "Book food tasting",
    "View pricing",
    "View menu on WhatsApp",
    "Start event inquiry",
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <FadeIn
          key={item}
          className="rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
          delay={0.18 + index * 0.05}
        >
          <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
            Guest action
          </p>
          <strong>{item}</strong>
        </FadeIn>
      ))}
    </div>
  );
}

type ServiceStyleCardProps = {
  items: typeof serviceStyles;
};

export function ServiceCollection({ items }: ServiceStyleCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <FadeIn
          key={item.slug}
          className="grid gap-4 rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
          delay={index * 0.08}
        >
          <div className="grid gap-[0.7rem]">
            <span className="inline-flex self-start rounded-full px-[0.55rem] py-[0.3rem] border border-line text-text-soft text-[0.75rem]">
              {item.label}
            </span>
            <h3 className="m-0 text-[1.2rem]">{item.title}</h3>
            <p className="text-text-soft leading-[1.7]">{item.description}</p>
          </div>
          <ul className="m-0 p-0 list-none grid gap-[0.7rem]">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="grid gap-[0.35rem]">
                {highlight}
              </li>
            ))}
          </ul>
          <div className="text-text-soft">{item.meta}</div>
        </FadeIn>
      ))}
    </div>
  );
}

export function PricingSnapshot() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {pricingCategories.slice(0, 4).map((category, index) => (
        <FadeIn
          key={category.slug}
          className="rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
          delay={index * 0.07}
        >
          <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
            {category.label}
          </p>
          <strong>{category.title}</strong>
          <p className="text-text-soft leading-[1.7]">{category.description}</p>
          <Link
            className="inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-line-strong bg-transparent text-text transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)]"
            href="/pricing"
          >
            Review {category.label.toLowerCase()}
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}

export function WhatsAppMenuCard() {
  return (
    <FadeIn
      className="rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
      delay={0.18}
    >
      <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
        Menu access
      </p>
      <h3 className="m-0 text-[1.2rem]">
        Keep the full menu handoff on WhatsApp
      </h3>
      <p className="text-text-soft leading-[1.7]">
        Guests can preview categories here, then request the complete menu
        directly through WhatsApp just like your current process.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          className="inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-accent text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813]"
          href="/menu"
        >
          Preview menu categories
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-line-strong bg-transparent text-text transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)]"
          href={businessInfo.whatsAppLink}
        >
          Open WhatsApp
        </Link>
      </div>
    </FadeIn>
  );
}

export function InquiryProcess() {
  return (
    <div className="grid gap-4 content-start md:grid-cols-2">
      {timelineSteps.map((step, index) => (
        <FadeIn
          key={step.title}
          className="relative overflow-hidden rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] before:content-[''] before:absolute before:left-0 before:top-[1.2rem] before:bottom-[1.2rem] before:w-[3px] before:bg-surface-muted"
          delay={index * 0.08}
        >
          <div className="pl-4 grid gap-[0.5rem]">
            <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
              Step {index + 1}
            </p>
            <h3 className="m-0 text-[1.2rem]">{step.title}</h3>
            <p className="text-text-soft leading-[1.7]">{step.description}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="pb-8">
      <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
        <div className="grid gap-[0.7rem] rounded-[1.75rem] p-[1.3rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
          <div>
            <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
              Lexi&apos;s Kitchen
            </p>
            <p className="text-text-soft leading-[1.7]">
              Structured static data, mobile-first layouts, and a polished
              inquiry flow designed for speed, clarity, and future scaling.
            </p>
          </div>
          <div className="flex flex-wrap gap-[0.9rem]">
            <Link
              href="/"
              className="text-text-soft hover:text-text focus-visible:text-text"
            >
              Inquiry
            </Link>
            <Link
              href="/pricing"
              className="text-text-soft hover:text-text focus-visible:text-text"
            >
              Pricing
            </Link>
            <Link
              href="/menu"
              className="text-text-soft hover:text-text focus-visible:text-text"
            >
              Menu
            </Link>
            <Link
              href={businessInfo.calendlyLink}
              className="text-text-soft hover:text-text focus-visible:text-text"
            >
              Book food tasting
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
