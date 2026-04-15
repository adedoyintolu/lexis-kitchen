import { LoadingState } from "@/components/layout/loading-state";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <main className="py-18">
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
