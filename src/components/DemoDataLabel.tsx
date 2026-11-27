export function DemoDataLabel({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-demo-line bg-demo-bg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-demo ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
      Demo data
    </span>
  );
}
