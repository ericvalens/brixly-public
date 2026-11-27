import { CalculatorWizard } from "@/components/CalculatorWizard";
import { DemoDataLabel } from "@/components/DemoDataLabel";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <DemoDataLabel />
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Walk a batch from the tank to a sample result.
        </h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Choose a measurement, describe the tank, set a target range, and pick ingredients.
          The last step opens a fixed example card so you can show the finished screen.
        </p>
      </header>
      <CalculatorWizard />
    </div>
  );
}
