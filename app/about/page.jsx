import Image from "next/image";
import { PageHead } from "@/components/blocks";
import { Reveal } from "@/components/reveal";
import { TIMELINE, SITE, CURRENTLY_EXPLORING } from "@/lib/data";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6">
        <div className="grid items-start gap-10 md:grid-cols-[auto_1fr]">
          <Image
            src={SITE.avatar}
            alt={`${SITE.name} avatar`}
            width={128}
            height={128}
            className="rounded-2xl border border-line"
          />
          <PageHead
            eyebrow="Who"
            title="About me"
            sub="Ahmad Hafizh, developer from Indonesia. I like taking an idea from a throwaway script to something real people use."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="space-y-12 border-l border-line pl-8 sm:pl-10">
          {TIMELINE.map((entry, i) => (
            <Reveal key={entry.year} delay={i * 0.05}>
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-accent ring-4 ring-base sm:-left-[45px]"
                />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {entry.year}
                </p>
                <p className="mt-2 max-w-[58ch] leading-relaxed text-muted">
                  {entry.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="rounded-xl border border-line bg-surface p-6">
            <h2 className="text-lg font-bold tracking-tight">Off the keyboard</h2>
            <p className="mt-2 leading-relaxed text-muted">
              Most spare time goes to tinkering: self-hosting small services,
              keeping a Minecraft server alive, and automating things on an old
              Android phone running Termux.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
