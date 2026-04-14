import { LoadingState } from "@/components/loading-state";
import { SiteHeader } from "@/components/site-sections";

export default function Loading() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="section-block">
        <div className="shell">
          <LoadingState
            title="Loading the inquiry experience"
            description="Preparing service styles, pricing, and inquiry details."
          />
        </div>
      </main>
    </div>
  );
}
