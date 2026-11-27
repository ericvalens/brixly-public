"use client";

import { useMemo, useState } from "react";
import { demoIngredients } from "@/data/demo";
import { exampleLemonade } from "@/data/demo";
import { ExampleResult } from "./ExampleResult";

const steps = ["Setup", "Current batch", "Target", "Ingredients", "Example result"];

type Method = "brix" | "density";
type Units = "imperial" | "metric";

type Draft = {
  step: number;
  method: Method;
  units: Units;
  color: boolean;
  volume: string;
  measure: string;
  acidity: string;
  absorbance: string;
  measureMin: string;
  measureMax: string;
  acidityMin: string;
  acidityMax: string;
  volumeMin: string;
  volumeMax: string;
  colorTarget: string;
  selected: string[];
};

const sampleDraft: Draft = {
  step: 1,
  method: "brix",
  units: "imperial",
  color: false,
  volume: "500",
  measure: "14.0",
  acidity: "1.10",
  absorbance: "0.380",
  measureMin: "11.0",
  measureMax: "12.0",
  acidityMin: "0.80",
  acidityMax: "1.00",
  volumeMin: "1000",
  volumeMax: "1500",
  colorTarget: "0.450",
  selected: ["ex-orange", "ex-lemon"],
};

function filled(value: string) {
  const n = Number(value);
  return value.trim() !== "" && Number.isFinite(n) && n > 0;
}

export function CalculatorWizard() {
  const [draft, setDraft] = useState<Draft>(sampleDraft);
  const [query, setQuery] = useState("");

  const patch = (partial: Partial<Draft>) => setDraft((prev) => ({ ...prev, ...partial }));

  const volumeName = draft.units === "metric" ? "Kilograms" : "Gallons";
  const measureName = draft.method === "brix" ? "Brix" : draft.units === "metric" ? "Density (g/cm³)" : "Density (lb/gal)";

  const canContinue = useMemo(() => {
    if (draft.step === 2) {
      return filled(draft.volume) && filled(draft.measure);
    }
    if (draft.step === 3) {
      return filled(draft.measureMin) || filled(draft.measureMax);
    }
    return true;
  }, [draft]);

  const visibleIngredients = demoIngredients.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const toggleIngredient = (id: string) => {
    patch({
      selected: draft.selected.includes(id)
        ? draft.selected.filter((item) => item !== id)
        : [...draft.selected, id],
    });
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_60px_-40px_rgba(23,33,43,0.5)]">
      <div className="border-b border-line px-5 py-5 sm:px-6">
        <ol className="flex flex-wrap gap-2">
          {steps.map((label, index) => {
            const number = index + 1;
            const active = draft.step === number;
            const done = draft.step > number;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => {
                    if (number < draft.step) patch({ step: number });
                  }}
                  disabled={number > draft.step}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
                    active
                      ? "bg-pine text-white"
                      : done
                        ? "bg-mist text-pine"
                        : "bg-[#f6f3ee] text-muted"
                  } disabled:cursor-default`}
                >
                  <span className="font-semibold tabular-nums">{done ? "✓" : number}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-6">
        {draft.step === 1 && (
          <div className="space-y-6">
            <header>
              <h2 className="font-display text-3xl">Setup</h2>
              <p className="mt-1 text-sm text-muted">
                Sample entries are already filled so the walkthrough has something to show.
              </p>
            </header>
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold">Color check on this batch?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: false, title: "No color check", copy: "Stay with volume, sweetness, and acidity." },
                  { value: true, title: "Include a color check", copy: "Add a sample absorbance field on the next steps." },
                ].map((option) => (
                  <label key={option.title} className="choice" data-active={draft.color === option.value}>
                    <input
                      type="radio"
                      name="color"
                      checked={draft.color === option.value}
                      onChange={() => patch({ color: option.value })}
                      className="mt-1 accent-pine"
                    />
                    <span>
                      <span className="block font-medium">{option.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{option.copy}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-6 lg:grid-cols-2">
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold">Measurement</legend>
                <label className="choice" data-active={draft.method === "brix"}>
                  <input
                    type="radio"
                    name="method"
                    checked={draft.method === "brix"}
                    onChange={() => patch({ method: "brix" })}
                    className="mt-1 accent-pine"
                  />
                  <span>
                    <span className="block font-medium">Brix</span>
                    <span className="mt-0.5 block text-sm text-muted">Refractometer reading</span>
                  </span>
                </label>
                <label className="choice" data-active={draft.method === "density"}>
                  <input
                    type="radio"
                    name="method"
                    checked={draft.method === "density"}
                    onChange={() => patch({ method: "density" })}
                    className="mt-1 accent-pine"
                  />
                  <span>
                    <span className="block font-medium">Density</span>
                    <span className="mt-0.5 block text-sm text-muted">Density meter reading</span>
                  </span>
                </label>
              </fieldset>
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold">Units</legend>
                <label className="choice" data-active={draft.units === "imperial"}>
                  <input
                    type="radio"
                    name="units"
                    checked={draft.units === "imperial"}
                    onChange={() => patch({ units: "imperial" })}
                    className="mt-1 accent-pine"
                  />
                  <span>
                    <span className="block font-medium">Imperial</span>
                    <span className="mt-0.5 block text-sm text-muted">Gallons and pounds</span>
                  </span>
                </label>
                <label className="choice" data-active={draft.units === "metric"}>
                  <input
                    type="radio"
                    name="units"
                    checked={draft.units === "metric"}
                    onChange={() => patch({ units: "metric" })}
                    className="mt-1 accent-pine"
                  />
                  <span>
                    <span className="block font-medium">Metric</span>
                    <span className="mt-0.5 block text-sm text-muted">Kilograms and g/cm³</span>
                  </span>
                </label>
              </fieldset>
            </div>
          </div>
        )}

        {draft.step === 2 && (
          <div className="space-y-5">
            <header>
              <h2 className="font-display text-3xl">Current batch</h2>
              <p className="mt-1 text-sm text-muted">What is in the tank right now. These boxes are sample entries.</p>
            </header>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label={`${volumeName} in tank`} value={draft.volume} onChange={(volume) => patch({ volume })} />
              <Field label={`Current ${measureName}`} value={draft.measure} onChange={(measure) => patch({ measure })} />
              <Field label="Current acidity %" value={draft.acidity} onChange={(acidity) => patch({ acidity })} />
            </div>
            {draft.color && (
              <Field
                label="Current absorbance"
                value={draft.absorbance}
                onChange={(absorbance) => patch({ absorbance })}
              />
            )}
          </div>
        )}

        {draft.step === 3 && (
          <div className="space-y-5">
            <header>
              <h2 className="font-display text-3xl">Target range</h2>
              <p className="mt-1 text-sm text-muted">
                A low and a high for the finished batch. Leave a box empty when that side is open.
              </p>
            </header>
            <Range
              title={measureName}
              min={draft.measureMin}
              max={draft.measureMax}
              onMin={(measureMin) => patch({ measureMin })}
              onMax={(measureMax) => patch({ measureMax })}
            />
            <Range
              title="Acidity %"
              min={draft.acidityMin}
              max={draft.acidityMax}
              onMin={(acidityMin) => patch({ acidityMin })}
              onMax={(acidityMax) => patch({ acidityMax })}
            />
            <Range
              title={`Finished ${volumeName.toLowerCase()}`}
              min={draft.volumeMin}
              max={draft.volumeMax}
              onMin={(volumeMin) => patch({ volumeMin })}
              onMax={(volumeMax) => patch({ volumeMax })}
            />
            {draft.color && (
              <Field
                label="Target absorbance"
                value={draft.colorTarget}
                onChange={(colorTarget) => patch({ colorTarget })}
              />
            )}
          </div>
        )}

        {draft.step === 4 && (
          <div className="space-y-4">
            <header>
              <h2 className="font-display text-3xl">Ingredients</h2>
              <p className="mt-1 text-sm text-muted">
                Pick from the example list. {draft.selected.length} selected.
              </p>
            </header>
            <input
              className="field"
              placeholder="Search the example list"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ul className="max-h-80 divide-y divide-line overflow-auto rounded-2xl border border-line">
              {visibleIngredients.map((item) => {
                const selected = draft.selected.includes(item.id);
                return (
                  <li key={item.id}>
                    <label className={`flex cursor-pointer items-center gap-3 px-4 py-3 ${selected ? "bg-mist" : "bg-white"}`}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleIngredient(item.id)}
                        className="h-4 w-4 accent-pine"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">{item.name}</span>
                        <span className="block text-xs text-muted">
                          {item.code} · {item.kind === "liquid" ? "Liquid" : "Powder"} · Brix {item.brixLabel} example
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
              {visibleIngredients.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-muted">Nothing in the example list matches.</li>
              )}
            </ul>
          </div>
        )}

        {draft.step === 5 && (
          <div className="space-y-4">
            <header>
              <h2 className="font-display text-3xl">Example result</h2>
              <p className="mt-1 text-sm text-muted">
                The card below is a fixed sample. It stays the same when the entries change.
              </p>
            </header>
            <div className="rounded-2xl bg-[#f7f5f1] px-4 py-3 text-sm text-muted">
              <span className="font-medium text-ink">What you entered. </span>
              {volumeName} {draft.volume || "—"}, {measureName} {draft.measure || "—"}, acidity {draft.acidity || "—"}%.
              {" "}
              {draft.selected.length} example ingredient{draft.selected.length === 1 ? "" : "s"} selected.
            </div>
            <ExampleResult batch={exampleLemonade} showLink />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => patch({ step: Math.max(1, draft.step - 1) })}
          disabled={draft.step === 1}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium disabled:opacity-40"
        >
          Back
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setDraft(sampleDraft);
              setQuery("");
            }}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-ink"
          >
            Reset sample
          </button>
          {draft.step < 5 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => patch({ step: draft.step + 1 })}
              className="rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white hover:bg-pine-dark disabled:opacity-40"
            >
              {draft.step === 4 ? "Show example result" : "Continue"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => patch({ step: 1 })}
              className="rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white hover:bg-pine-dark"
            >
              Start again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
      <input
        className="field tabular-nums"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Range({
  title,
  min,
  max,
  onMin,
  onMax,
}: {
  title: string;
  min: string;
  max: string;
  onMin: (value: string) => void;
  onMax: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{title}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Low" value={min} onChange={onMin} />
        <Field label="High" value={max} onChange={onMax} />
      </div>
    </div>
  );
}
