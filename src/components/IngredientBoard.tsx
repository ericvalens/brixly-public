"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { demoIngredients, type DemoIngredient, type IngredientKind } from "@/data/demo";
import { DemoDataLabel } from "./DemoDataLabel";

const storageKey = "brixly-custom-ingredients";
const emptyList: DemoIngredient[] = [];

let cachedRaw: string | null = null;
let cachedList: DemoIngredient[] = emptyList;
const listeners = new Set<() => void>();

function readCustom(): DemoIngredient[] {
  const raw = localStorage.getItem(storageKey);
  if (raw === cachedRaw) return cachedList;
  cachedRaw = raw;
  if (!raw) {
    cachedList = emptyList;
    return cachedList;
  }
  try {
    const parsed = JSON.parse(raw) as DemoIngredient[];
    cachedList = Array.isArray(parsed) ? parsed : emptyList;
  } catch {
    cachedList = emptyList;
  }
  return cachedList;
}

function writeCustom(next: DemoIngredient[]) {
  const raw = JSON.stringify(next);
  localStorage.setItem(storageKey, raw);
  cachedRaw = raw;
  cachedList = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const emptyDraft = {
  name: "",
  code: "",
  kind: "liquid" as IngredientKind,
  brixLabel: "",
  acidityLabel: "",
  densityLabel: "",
};

export function IngredientBoard() {
  const custom = useSyncExternalStore(subscribe, readCustom, () => emptyList);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);

  const saveCustom = (next: DemoIngredient[]) => {
    writeCustom(next);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = useMemo(() => {
    const all = [...demoIngredients, ...custom];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((item) =>
      `${item.name} ${item.code}`.toLowerCase().includes(q),
    );
  }, [custom, query]);

  const liquids = items.filter((item) => item.kind === "liquid");
  const powders = items.filter((item) => item.kind === "powder");

  const addIngredient = () => {
    if (!draft.name.trim()) return;
    const next: DemoIngredient = {
      id: `custom-${Date.now()}`,
      code: draft.code.trim() || "EX-CUSTOM",
      name: draft.name.trim(),
      kind: draft.kind,
      brixLabel: draft.brixLabel.trim() || "—",
      acidityLabel: draft.acidityLabel.trim() || "—",
      densityLabel: draft.densityLabel.trim() || "—",
      custom: true,
    };
    saveCustom([next, ...custom]);
    setDraft(emptyDraft);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <header className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_10.5rem] sm:gap-6">
        <div>
          <DemoDataLabel />
          <h1 className="mt-4 font-display text-[2rem] leading-[1.15] tracking-tight sm:text-5xl">Ingredient list</h1>
          <p className="mt-3 text-base leading-7 text-muted">
            A short example catalog for the walkthrough. Cards you add stay in this browser and are labeled as your samples.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-pine px-5 text-sm font-semibold text-white hover:bg-pine-dark sm:w-auto"
          >
            Add a sample
          </button>
        </div>
        <figure className="mx-auto w-40 overflow-hidden rounded-[1.5rem] border border-line bg-[#f7f3ea] sm:w-full">
          <Image
            src="/images/lab.webp"
            alt="A refractometer beside a beaker of juice"
            width={1024}
            height={1024}
            sizes="(min-width: 640px) 168px, 160px"
            priority
            className="h-auto w-full"
          />
        </figure>
      </header>

      <input
        className="field"
        placeholder="Search by name or example code"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <IngredientGroup title="Liquids" note="Shown in gallons" items={liquids} onDelete={(id) => saveCustom(custom.filter((item) => item.id !== id))} />
      <IngredientGroup title="Powders" note="Shown in pounds" items={powders} onDelete={(id) => saveCustom(custom.filter((item) => item.id !== id))} />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#17212b]/40 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="add-title" className="font-display text-3xl">Add a sample ingredient</h2>
            <p className="mt-1 text-sm text-muted">Type any labels you want to show. Nothing here is looked up or derived.</p>
            <div className="mt-5 grid gap-3">
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Name</span>
                <input className="field" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Example code</span>
                <input className="field" value={draft.code} onChange={(event) => setDraft({ ...draft, code: event.target.value })} />
              </label>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Kind</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["liquid", "powder"] as const).map((kind) => (
                    <label key={kind} className="choice" data-active={draft.kind === kind}>
                      <input
                        type="radio"
                        name="kind"
                        checked={draft.kind === kind}
                        onChange={() => setDraft({ ...draft, kind })}
                        className="mt-1 accent-pine"
                      />
                      <span className="capitalize">{kind}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="space-y-1.5 text-sm">
                  <span className="font-medium">Brix label</span>
                  <input className="field" value={draft.brixLabel} onChange={(event) => setDraft({ ...draft, brixLabel: event.target.value })} />
                </label>
                <label className="space-y-1.5 text-sm">
                  <span className="font-medium">Acidity label</span>
                  <input className="field" value={draft.acidityLabel} onChange={(event) => setDraft({ ...draft, acidityLabel: event.target.value })} />
                </label>
                <label className="space-y-1.5 text-sm">
                  <span className="font-medium">Density label</span>
                  <input className="field" value={draft.densityLabel} onChange={(event) => setDraft({ ...draft, densityLabel: event.target.value })} />
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="min-h-11 rounded-full px-4 text-sm font-medium text-muted">
                Cancel
              </button>
              <button
                type="button"
                onClick={addIngredient}
                disabled={!draft.name.trim()}
                className="min-h-11 rounded-full bg-pine px-5 text-sm font-semibold text-white disabled:opacity-40"
              >
                Save sample
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IngredientGroup({
  title,
  note,
  items,
  onDelete,
}: {
  title: string;
  note: string;
  items: DemoIngredient[];
  onDelete: (id: string) => void;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{title}</h2>
        <span className="rounded-full bg-mist px-2 py-0.5 text-xs font-medium text-pine">{note}</span>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-line bg-white px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{item.code}</p>
                <h3 className="text-lg font-semibold">{item.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                {item.custom ? (
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium text-muted"
                  >
                    Remove
                  </button>
                ) : (
                  <span className="rounded-full bg-demo-bg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-demo">
                    Example
                  </span>
                )}
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <div className="min-w-0">
                <dt className="text-xs text-muted">Brix</dt>
                <dd className="break-words font-medium tabular-nums">{item.brixLabel}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-muted">Acidity</dt>
                <dd className="break-words font-medium tabular-nums">{item.acidityLabel}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-muted">Density</dt>
                <dd className="break-words font-medium tabular-nums">{item.densityLabel}</dd>
              </div>
            </dl>
          </article>
        ))}
        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
            Nothing in this group matches the search.
          </p>
        )}
      </div>
    </section>
  );
}
