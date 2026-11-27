import Image from "next/image";
import { CalculatorWizard } from "@/components/CalculatorWizard";
import { DemoDataLabel } from "@/components/DemoDataLabel";

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-[#f7f3ea]">
        <Image
          src="/images/hero.webp"
          alt="Oranges, lemons, berries, and apples flowing toward stainless blending tanks"
          width={1280}
          height={720}
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full"
        />
      </figure>
      <header className="max-w-2xl">
        <DemoDataLabel />
        <h1 className="mt-4 font-display text-[2rem] leading-[1.15] tracking-tight text-ink sm:text-5xl">
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
