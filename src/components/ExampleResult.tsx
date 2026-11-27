import Link from "next/link";
import type { ExampleBatch } from "@/data/demo";
import { DemoDataLabel } from "./DemoDataLabel";

export function ExampleResult({
  batch,
  showLink = false,
}: {
  batch: ExampleBatch;
  showLink?: boolean;
}) {
  const stats = [
    { label: "Volume", value: batch.volume },
    { label: "Brix", value: batch.brix },
    { label: "Acidity", value: batch.acidity },
    { label: "Color reading", value: batch.color },
  ];

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_50px_-36px_rgba(23,33,43,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {batch.id} · {batch.tank}
          </p>
          <h3 className="mt-1 text-balance font-display text-xl leading-snug text-ink sm:text-2xl">{batch.title}</h3>
          <p className="mt-1 max-w-xl text-sm text-muted">{batch.summary}</p>
        </div>
        <DemoDataLabel />
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 py-5 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-[#f7f5f1] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </p>
            <p className="mt-1 font-display text-2xl tabular-nums text-ink">{stat.value}</p>
            <p className="text-xs text-demo">Example</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 px-5 pb-5 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Sample additions
        </p>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {batch.adds.map((add) => (
            <li key={add.name} className="flex items-center justify-between gap-3 bg-white px-4 py-3 text-sm">
              <span className="min-w-0 font-medium">{add.name}</span>
              <span className="shrink-0 tabular-nums text-muted">
                {add.amount} <span className="text-demo">example</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="rounded-2xl bg-demo-bg px-4 py-3 text-sm text-demo">
          {batch.status}. These figures are a fixed sample for the walkthrough.
        </p>
        {showLink && (
          <Link
            href="/demo/results"
            className="inline-flex text-sm font-semibold text-pine underline-offset-4 hover:underline"
          >
            Open the full example
          </Link>
        )}
      </div>
    </article>
  );
}
