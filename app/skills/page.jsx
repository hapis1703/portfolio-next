import { PageHead } from "@/components/blocks";
import { Reveal } from "@/components/reveal";
import { SKILL_GROUPS, CURRENTLY_EXPLORING } from "@/lib/data";

export const metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6">
        <PageHead
          eyebrow="Toolkit"
          title="Skills"
          sub="Grouped by where they get used. No percentage bars; you can ask for proof on any of these."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.key} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-bold tracking-tight">{group.title}</h2>
                  <span className="font-mono text-xs text-muted">{group.blurb}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-base px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 rounded-xl border border-line bg-raised p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Now learning</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted">
              {CURRENTLY_EXPLORING.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
