"use client";

import { ErrorState } from "@/components/layout/error-state";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="min-h-screen">
      <main className="py-[4.5rem]">
        <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
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
