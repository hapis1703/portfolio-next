import { MARQUEE_ITEMS } from "@/lib/data";

export function Marquee() {
  const items = MARQUEE_ITEMS;
  return (
    <div className="relative z-10 overflow-hidden border-y border-line/70 py-5">
      <div className="marquee-track flex w-max items-center gap-8">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap font-mono text-sm text-muted"
          >
            {item}
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
