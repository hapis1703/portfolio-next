import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { getRecentRepos } from "@/lib/github";
import { PageHead, RepoCard } from "@/components/blocks";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";

export const revalidate = 3600;

export const metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const recent = await getRecentRepos(9);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6">
        <PageHead
          eyebrow="Work"
          title="Projects"
          sub="Pinned picks plus whatever recently left the workbench. Everything lives on GitHub."
        />
      </section>

      <Marquee />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="mb-8 text-xl font-bold tracking-tight">Latest pushes</h2>
        </Reveal>
        {recent.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-10 text-center text-muted">
            Could not reach the GitHub API right now. Check back in a bit.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((repo, i) => (
              <Reveal key={repo.name} delay={i * 0.05}>
                <RepoCard repo={repo} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <a
            href="https://github.com/hapis1703?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Full archive on GitHub <IconArrowRight size={16} />
          </a>
        </Reveal>
      </section>
    </>
  );
}
