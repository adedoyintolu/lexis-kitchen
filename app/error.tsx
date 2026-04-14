"use client";

import { ErrorState } from "@/components/error-state";
import { SiteHeader } from "@/components/site-sections";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="section-block">
        <div className="shell">
          <ErrorState
            title="Something interrupted the inquiry flow"
            description="The page could not finish rendering. You can retry the request or return to the home page."
            detail={error.message}
            onRetry={unstable_retry}
          />
        </div>
      </main>
    </div>
  );
}
