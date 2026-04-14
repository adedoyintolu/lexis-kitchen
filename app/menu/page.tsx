import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn, SiteFooter, SiteHeader } from "@/components/site-sections";
import { menuCollections } from "@/data/inquiry";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description:
    "Explore Lexi's Kitchen menu collections and request the full menu through WhatsApp.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="section-block">
        <div className="shell">
          <SectionHeading
            eyebrow="Menu overview"
            title="A preview of the collections behind the inquiry flow"
            description="Your live process sends the full menu through WhatsApp. This page keeps that behavior while still giving guests a curated preview of the food categories available."
          />
          <div className="menu-page-banner">
            <div>
              <p className="eyebrow">Full menu delivery</p>
              <h2>Request the complete menu directly on WhatsApp</h2>
            </div>
            <Link
              className="button button-primary"
              href="https://wa.me/15551234567"
            >
              Open WhatsApp
            </Link>
          </div>
          <div className="menu-collection-grid">
            {menuCollections.map((collection, index) => (
              <FadeIn
                key={collection.slug}
                className="menu-collection-card"
                delay={index * 0.06}
              >
                <div className="menu-collection-header">
                  <p className="eyebrow">{collection.label}</p>
                  <h2>{collection.title}</h2>
                  <p>{collection.description}</p>
                </div>
                <ul className="menu-item-list">
                  {collection.items.map((item) => (
                    <li key={item.name}>
                      <div className="menu-item-title-row">
                        <span>{item.name}</span>
                        {item.tag ? (
                          <span className="pill-tag">{item.tag}</span>
                        ) : null}
                      </div>
                      <p>{item.description}</p>
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
