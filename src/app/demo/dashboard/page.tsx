import Image from "next/image";
import Link from "next/link";
import { DemoDataLabel } from "@/components/DemoDataLabel";
import { dashboardStats, recentBatches, tankBoard, weekBars } from "@/data/demo";

const stateTone: Record<string, string> = {
  "On spec": "bg-mist text-pine",
  Review: "bg-demo-bg text-demo",
  Open: "bg-[#f6f3ee] text-muted",
};

export default function DashboardDemoPage() {
  return (
    <div className="space-y-6">
      <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-[#f7f3ea]">
        <Image
          src="/images/floor.webp"
          alt="Production floor with blending tanks and a bottle conveyor"
          width={1280}
          height={720}
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-48 w-full object-cover object-[center_40%] sm:h-72"
        />
      </figure>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <DemoDataLabel />
          <h1 className="mt-4 font-display text-[2rem] leading-[1.15] tracking-tight sm:text-5xl">Floor dashboard</h1>
          <p className="mt-3 text-base leading-7 text-muted">
            A sample view of the day: counts, tanks, and a short list of batches. Every tile is a placeholder.
          </p>
        </div>
        <Link
          href="/demo/summary"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-pine underline-offset-4 hover:underline"
        >
          Open batch EX-2041
        </Link>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <article key={stat.label} className="rounded-3xl border border-line bg-white px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{stat.label}</p>
            <p className="mt-2 font-display text-4xl tabular-nums">{stat.value}</p>
            <p className="mt-1 text-xs text-demo">{stat.hint}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl">Tanks</h2>
            <DemoDataLabel />
          </div>
          <ul className="divide-y divide-line">
            {tankBoard.map((tank) => (
              <li key={tank.tank} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{tank.tank}</p>
                  <p className="text-sm text-muted">{tank.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm tabular-nums">{tank.volume}</p>
                  <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${stateTone[tank.state]}`}>
                    {tank.state}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-display text-2xl">Sample week</h2>
          <p className="mt-1 text-sm text-muted">Placeholder bars for batches per day.</p>
          <ul className="mt-5 space-y-3">
            {weekBars.map((bar) => (
              <li key={bar.day} className="grid grid-cols-[2.5rem_1fr_1.5rem] items-center gap-3 text-sm">
                <span className="text-muted">{bar.day}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-[#f1ece4]">
                  <span className="block h-full rounded-full bg-pine" style={{ width: bar.width }} />
                </span>
                <span className="text-right tabular-nums text-muted">{bar.label}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="overflow-hidden rounded-3xl border border-line bg-white">
        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <h2 className="font-display text-2xl">Recent example batches</h2>
          <DemoDataLabel />
        </div>
        <ul className="divide-y divide-line md:hidden">
          {recentBatches.map((batch) => (
            <li key={batch.id} className="space-y-2 px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{batch.id}</p>
                  <p className="text-sm text-muted">{batch.product}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${stateTone[batch.state]}`}>
                  {batch.state}
                </span>
              </div>
              <p className="text-sm tabular-nums text-muted">{batch.volume}</p>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-y border-line bg-[#faf8f5] text-[11px] uppercase tracking-[0.14em] text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Batch</th>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Volume</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBatches.map((batch) => (
                <tr key={batch.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 font-medium">{batch.id}</td>
                  <td className="px-5 py-3">{batch.product}</td>
                  <td className="px-5 py-3 tabular-nums">{batch.volume}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${stateTone[batch.state]}`}>
                      {batch.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
