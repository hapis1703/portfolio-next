import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconStar } from "@tabler/icons-react";
import { getPinnedRepos, getProfile } from "@/lib/github";
import { PageHead, RepoCard } from "@/components/blocks";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/data";

export const revalidate = 3600;

export default async function HomePage() {
  const [profile, repos] = await Promise.all([getProfile(), getPinnedRepos()]);

  return (
    <>
      <section className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-4 font-mono text-sm text-muted">
              <span className="text-accent">$</span> whoami
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter sm:text-7xl">
              Ahmad Hafizh.
              <br />
              <span className="text-accent">Builds things</span> for the web.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-muted">
              Developer from Indonesia. Web apps, bots, automation, and the odd
              Minecraft plugin. Currently shipping with React and Next.js.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                View projects <IconArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-line px-6 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
          {profile && (
            <Reveal delay={0.32}>
              <dl className="mt-12 flex gap-8 font-mono text-sm text-muted">
                <div>
                  <dt className="sr-only">Public repos</dt>
                  <dd>
                    <span className="text-xl font-bold text-ink">{profile.repos}</span> repos
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Followers</dt>
                  <dd>
                    <span className="text-xl font-bold text-ink">{profile.followers}</span> followers
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd>{SITE.location}</dd>
                </div>
              </dl>
            </Reveal>
          )}
        </div>

        <Image
          src={profile?.avatar || SITE.avatar}
          alt={`${SITE.name} avatar`}
          width={160}
          height={160}
          priority
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-line lg:block"
        />
      </section>

      <Marquee />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Pinned work</h2>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
            >
              All projects <IconArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.06}>
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_auto] md:items-center">
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Like the work?
              </h2>
              <p className="mt-2 max-w-md text-muted">
                The whole site is open source, and so is my coffee fund.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5"
              >
                Buy me a coffee
              </Link>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-accent"
              >
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
