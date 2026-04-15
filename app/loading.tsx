import { LoadingState } from "@/components/loading-state";
import { SiteHeader } from "@/components/site-sections";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-[4.5rem]">
        <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
          <LoadingState
            title="Loading the inquiry experience"
            description="Preparing service styles, pricing, and inquiry details."
          />
        </div>
      </main>
    </div>
  );
}
