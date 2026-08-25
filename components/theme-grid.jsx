"use client";

import { useTheme } from "@/components/theme-provider";
import { Reveal } from "@/components/reveal";

const THEMES = [
  {
    id: "modern",
    label: "Modern",
    desc: "Cool cyan on deep slate. The everyday default.",
    swatch: ["oklch(0.72 0.14 200)", "oklch(0.75 0.13 200)"],
  },
  {
    id: "sunset",
    label: "Sunset",
    desc: "Burnt orange warmth, evening-sky neutrals.",
    swatch: ["oklch(0.68 0.17 45)", "oklch(0.74 0.15 50)"],
  },
  {
    id: "neon",
    label: "Neon",
    desc: "Hot pink with maximum contrast. Not shy.",
    swatch: ["oklch(0.68 0.26 340)", "oklch(0.75 0.24 340)"],
  },
  {
    id: "ocean",
    label: "Ocean",
    desc: "Cobalt blue for long reading sessions.",
    swatch: ["oklch(0.62 0.14 240)", "oklch(0.7 0.13 235)"],
  },
  {
    id: "forest",
    label: "Forest",
    desc: "Deep green, calm and grounded.",
    swatch: ["oklch(0.6 0.12 155)", "oklch(0.7 0.14 158)"],
  },
  {
    id: "mono",
    label: "Mono",
    desc: "No hue at all. Pure grayscale discipline.",
    swatch: ["oklch(0.55 0 0)", "oklch(0.75 0 0)"],
  },
];

function ThemeCard({ theme }) {
  const { theme: active, mode, setPrefs } = useTheme();
  const isActive = active === theme.id;

  return (
    <button
      onClick={() => setPrefs((p) => ({ ...p, theme: theme.id }))}
      aria-pressed={isActive}
      className={`flex h-full flex-col rounded-xl border p-5 text-left transition-all ${
        isActive ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-accent/60"
      } bg-surface`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {theme.swatch.map((c, i) => (
            <span
              key={i}
              className="size-8 rounded-lg border border-line"
              style={{ background: c }}
            />
          ))}
        </div>
        {isActive && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-ink)]">
            Active
          </span>
        )}
      </div>
      <h2 className="mt-4 font-bold tracking-tight">{theme.label}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">{theme.desc}</p>
      <span className="mt-3 text-xs text-muted">
        Current mode: <span className="text-accent">{mode}</span>
      </span>
    </button>
  );
}

export default function ThemeGrid() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.05}>
            <ThemeCard theme={t} />
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        Tip: light and dark toggle lives in the navbar, next to the palette icon.
      </p>
    </>
  );
}
