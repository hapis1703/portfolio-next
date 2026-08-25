import { SITE } from "@/lib/data";

export function PageHead({ eyebrow, title, sub }) {
  return (
    <div className="mx-auto max-w-2xl">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}

export function RepoCard({ repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono font-semibold group-hover:text-accent transition-colors">
          {repo.name}
        </h3>
        <span className="shrink-0 rounded-md bg-raised px-2 py-0.5 text-xs text-muted">
          {repo.language}
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{repo.description}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1">★ {repo.stars}</span>
        {repo.pushedAt && (
          <span>pushed {new Date(repo.pushedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
        )}
      </div>
    </a>
  );
}
