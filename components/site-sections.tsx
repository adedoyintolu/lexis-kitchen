import Link from "next/link";
import {
  businessInfo,
  inquiryActions,
  pricingCategories,
  serviceStyles,
  timelineSteps,
} from "@/data/inquiry";

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
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link
          href="/"
          className="brand-lockup"
          aria-label="Lexi's Kitchen home"
        >
          <strong>Lexi&apos;s Kitchen</strong>
          <span>Premium event catering</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/menu">Menu</Link>
          <Link href={businessInfo.calendlyLink}>Food tasting</Link>
        </nav>
      </div>
    </header>
  );
}

export function CtaGroup() {
  return (
    <div className="button-row">
      {inquiryActions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={`button ${action.variant === "primary" ? "button-primary" : "button-secondary"}`}
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
    <div className="highlight-grid">
      {items.map((item, index) => (
        <FadeIn key={item} className="content-card" delay={0.18 + index * 0.05}>
          <p className="eyebrow">Guest action</p>
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
    <div className="service-grid">
      {items.map((item, index) => (
        <FadeIn key={item.slug} className="service-card" delay={index * 0.08}>
          <div className="service-card-header">
            <span className="info-kicker">{item.label}</span>
            <h3>{item.title}</h3>
            <p className="section-copy">{item.description}</p>
          </div>
          <ul className="detail-list">
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="service-meta">{item.meta}</div>
        </FadeIn>
      ))}
    </div>
  );
}

export function PricingSnapshot() {
  return (
    <div className="highlight-grid">
      {pricingCategories.slice(0, 4).map((category, index) => (
        <FadeIn
          key={category.slug}
          className="content-card"
          delay={index * 0.07}
        >
          <p className="eyebrow">{category.label}</p>
          <strong>{category.title}</strong>
          <p className="section-copy">{category.description}</p>
          <Link className="button button-secondary" href="/pricing">
            Review {category.label.toLowerCase()}
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}

export function WhatsAppMenuCard() {
  return (
    <FadeIn className="content-card" delay={0.18}>
      <p className="eyebrow">Menu access</p>
      <h3>Keep the full menu handoff on WhatsApp</h3>
      <p className="section-copy">
        Guests can preview categories here, then request the complete menu
        directly through WhatsApp just like your current process.
      </p>
      <div className="button-row">
        <Link className="button button-primary" href="/menu">
          Preview menu categories
        </Link>
        <Link
          className="button button-secondary"
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
    <div className="process-grid">
      {timelineSteps.map((step, index) => (
        <FadeIn key={step.title} className="process-card" delay={index * 0.08}>
          <div className="process-card-inner">
            <p className="eyebrow">Step {index + 1}</p>
            <h3>{step.title}</h3>
            <p className="section-copy">{step.description}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-card">
          <div>
            <p className="eyebrow">Lexi&apos;s Kitchen</p>
            <p className="footer-copy">
              Structured static data, mobile-first layouts, and a polished
              inquiry flow designed for speed, clarity, and future scaling.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/">Inquiry</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/menu">Menu</Link>
            <Link href={businessInfo.calendlyLink}>Book food tasting</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
