import { ExampleResult } from "@/components/ExampleResult";
import { DemoDataLabel } from "@/components/DemoDataLabel";
import { exampleApple, exampleLemonade } from "@/data/demo";

export default function ResultsDemoPage() {
  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <DemoDataLabel />
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">Example results</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Two finished sample cards. They show the shape of a recommendation screen with placeholder figures.
        </p>
      </header>
      <ExampleResult batch={exampleLemonade} />
      <ExampleResult batch={exampleApple} />
    </div>
  );
}
