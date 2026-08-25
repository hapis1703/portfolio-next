"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconSun,
  IconMoonStars,
  IconPalette,
  IconX,
  IconMenu,
  IconCheck,
} from "@tabler/icons-react";
import { useTheme } from "@/components/theme-provider";
import { NAV } from "@/lib/data";

export const THEMES = [
  { id: "modern", label: "Modern", swatch: "#22d3ee" },
  { id: "sunset", label: "Sunset", swatch: "#f97316" },
  { id: "neon", label: "Neon", swatch: "#ec4899" },
  { id: "ocean", label: "Ocean", swatch: "#5b8def" },
  { id: "forest", label: "Forest", swatch: "#34d399" },
  { id: "mono", label: "Mono", swatch: "#a3a3a3" },
];

function ModeToggle() {
  const { mode, setPrefs } = useTheme();
  return (
    <button
      aria-label="Toggle light or dark mode"
      onClick={() => setPrefs((p) => ({ ...p, mode: p.mode === "dark" ? "light" : "dark" }))}
      className="rounded-lg border border-line bg-surface p-2 text-muted hover:text-accent hover:border-accent transition-colors"
    >
      {mode === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </button>
  );
}

function PaletteMenu() {
  const { theme, setPrefs } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="Pick accent theme"
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-line bg-surface p-2 text-muted hover:text-accent hover:border-accent transition-colors"
      >
        <IconPalette size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <button
              aria-label="Close theme picker"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-line bg-raised p-1.5 shadow-xl"
            >
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setPrefs((p) => ({ ...p, theme: t.id }));
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-base transition-colors"
                >
                  <span
                    className="size-4 rounded-full border border-line"
                    style={{ background: t.swatch }}
                  />
                  <span className="flex-1 text-left">{t.label}</span>
                  {theme === t.id && <IconCheck size={15} className="text-accent" />}
                </button>
              ))}
              <Link
                href="/themes"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg px-3 py-2 text-xs text-muted hover:text-accent transition-colors"
              >
                All themes &rarr;
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm font-bold text-[var(--accent-ink)]">
            AH
          </span>
          <span className="hidden sm:inline">hafizh</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-surface text-accent"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <PaletteMenu />
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-line bg-surface p-2 text-muted md:hidden"
          >
            {mobileOpen ? <IconX size={18} /> : <IconMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line/70 md:hidden"
          >
            <ul className="space-y-1 p-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm ${
                      (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "bg-surface text-accent"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
