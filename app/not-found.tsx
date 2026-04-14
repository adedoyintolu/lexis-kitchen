import Link from "next/link";
import { SiteHeader } from "@/components/site-sections";

export default function NotFound() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="section-block">
        <div className="shell">
          <div className="state-card">
            <p className="eyebrow">Not found</p>
            <h2>The page you requested is not available.</h2>
            <p className="form-note">
              Use the links below to return to the inquiry, pricing, or menu
              experience.
            </p>
            <div className="state-actions">
              <Link className="button button-primary" href="/">
                Back to inquiry
              </Link>
              <Link className="button button-secondary" href="/pricing">
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
