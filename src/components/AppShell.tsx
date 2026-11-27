"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoDataLabel } from "./DemoDataLabel";

const links = [
  { href: "/", label: "Calculator" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/demo/results", label: "Example results" },
  { href: "/demo/dashboard", label: "Example dashboard" },
  { href: "/demo/summary", label: "Example summary" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map((link, index) => {
        const active = pathname === link.href;
        return (
          <div key={link.href}>
            {index === 2 && (
              <p className="mb-1 mt-5 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Examples
              </p>
            )}
            <Link
              href={link.href}
              onClick={onNavigate}
              className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-mist font-semibold text-pine"
                  : "text-ink/80 hover:bg-[#f6f3ee]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="font-display text-2xl text-pine">
            Brixly
          </Link>
          <DemoDataLabel />
        </div>
        <details className="border-t border-line px-4 py-2">
          <summary className="cursor-pointer py-1 text-sm font-medium text-muted">
            Menu
          </summary>
          <div className="pb-3 pt-2">
            <NavLinks />
          </div>
        </details>
      </header>

      <div className="lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-white px-5 py-7 lg:flex">
          <Link href="/" className="font-display text-[2.4rem] leading-none text-pine">
            Brixly
          </Link>
          <p className="mt-2 text-sm leading-5 text-muted">
            Quality standard workspace
          </p>
          <div className="mt-4">
            <DemoDataLabel />
          </div>
          <div className="mt-8">
            <NavLinks />
          </div>
          <p className="mt-auto pt-8 text-xs leading-5 text-muted">
            Public walkthrough. Figures on every screen are sample placeholders.
          </p>
        </aside>

        <div className="min-w-0">
          <main id="main" className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
