import { DemoDataLabel } from "@/components/DemoDataLabel";
import { exampleLemonade, summaryRows } from "@/data/demo";

export default function SummaryDemoPage() {
  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <DemoDataLabel />
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">Batch summary</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          A sample close-out sheet for one batch. Targets and readings are both placeholders, printed side by side for the walkthrough.
        </p>
      </header>

      <article className="overflow-hidden rounded-3xl border border-line bg-white">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-6 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{exampleLemonade.id}</p>
            <h2 className="mt-1 font-display text-4xl">{exampleLemonade.product}</h2>
            <p className="mt-2 text-sm text-muted">{exampleLemonade.tank} · Morning shift sample</p>
          </div>
          <DemoDataLabel />
        </div>

        <dl className="grid gap-4 border-b border-line px-6 py-5 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Started</dt>
            <dd className="mt-1 font-medium">08:10 · example</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Finished</dt>
            <dd className="mt-1 font-medium">09:40 · example</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Recorded by</dt>
            <dd className="mt-1 font-medium">Demo operator</dd>
          </div>
        </dl>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-[#faf8f5] text-[11px] uppercase tracking-[0.14em] text-muted">
              <tr>
                <th className="px-6 py-3 font-semibold">Spec</th>
                <th className="px-6 py-3 font-semibold">Example target</th>
                <th className="px-6 py-3 font-semibold">Example reading</th>
                <th className="px-6 py-3 font-semibold">Example status</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={row.spec} className="border-t border-line">
                  <td className="px-6 py-3 font-medium">{row.spec}</td>
                  <td className="px-6 py-3 tabular-nums">{row.target}</td>
                  <td className="px-6 py-3 tabular-nums">{row.reading}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-full bg-mist px-2 py-0.5 text-xs font-semibold text-pine">{row.state}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 px-6 py-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Sample additions</h3>
            <ul className="mt-3 space-y-2">
              {exampleLemonade.adds.map((add) => (
                <li key={add.name} className="flex justify-between rounded-2xl bg-[#f7f5f1] px-4 py-3 text-sm">
                  <span>{add.name}</span>
                  <span className="tabular-nums text-muted">{add.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-demo-line bg-demo-bg px-4 py-4 text-sm text-demo">
            <p className="font-semibold">Demo data</p>
            <p className="mt-1 leading-6">
              This sheet is a picture of a completed batch. The readings were typed in as examples. They are here so the summary screen has something to present.
            </p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-line px-6 py-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Prepared</p>
            <p className="mt-6 border-b border-line" />
            <p className="mt-2 text-sm text-muted">Demo operator</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Reviewed</p>
            <p className="mt-6 border-b border-line" />
            <p className="mt-2 text-sm text-muted">Sample signature line</p>
          </div>
        </div>
      </article>
    </div>
  );
}
