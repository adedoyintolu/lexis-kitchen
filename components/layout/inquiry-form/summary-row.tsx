export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-white/60">{label}</span>
      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}
