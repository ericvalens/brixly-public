"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DemoDataLabel } from "./DemoDataLabel";

const links = [
  { href: "/", label: "Calculator", short: "Calc", icon: "calc" },
  { href: "/ingredients", label: "Ingredients", short: "Items", icon: "items" },
  { href: "/demo/results", label: "Example results", short: "Results", icon: "results" },
  { href: "/demo/dashboard", label: "Example dashboard", short: "Floor", icon: "floor" },
  { href: "/demo/summary", label: "Example summary", short: "Summary", icon: "summary" },
];

function NavIcon({ name }: { name: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "calc") {
    return (
      <svg {...props}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
      </svg>
    );
  }
  if (name === "items") {
    return (
      <svg {...props}>
        <path d="M8 6h12M8 12h12M8 18h12" />
        <path d="M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    );
  }
  if (name === "results") {
    return (
      <svg {...props}>
        <path d="M4 19V5M4 19h16" />
        <path d="M8 15v-3M12 15V8M16 15v-5" />
      </svg>
    );
  }
  if (name === "floor") {
    return (
      <svg {...props}>
        <path d="M4 20V10l4-2v12M12 20V6l4-2v16M20 20V9" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

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
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${
                active ? "bg-mist font-semibold text-pine" : "text-ink/80 hover:bg-[#f6f3ee]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <NavIcon name={link.icon} />
              {link.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-label={link.label}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium leading-none ${
                  active ? "text-pine" : "text-muted"
                }`}
              >
                <NavIcon name={link.icon} />
                <span>{link.short}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-line bg-white/95 px-4 backdrop-blur lg:hidden">
        <Link href="/" className="font-display text-[1.7rem] leading-none text-pine">
          Brixly
        </Link>
        <DemoDataLabel />
      </header>

      <div className="lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-white px-5 py-7 lg:flex">
          <Link href="/" className="font-display text-[2.4rem] leading-none text-pine">
            Brixly
          </Link>
          <p className="mt-2 text-sm leading-5 text-muted">Quality standard workspace</p>
          <div className="mt-4">
            <DemoDataLabel />
          </div>
          <div className="mt-8">
            <NavLinks />
          </div>
          <p className="mt-auto pt-8 text-xs leading-5 text-muted">
            Figures on every screen are sample placeholders.
          </p>
        </aside>

        <div className="min-w-0">
          <main
            id="main"
            className="mx-auto w-full max-w-5xl px-4 pb-24 pt-5 sm:px-8 sm:pt-8 lg:pb-12 lg:pt-10"
          >
            {children}
          </main>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
