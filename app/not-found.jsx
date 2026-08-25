import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60dvh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-sm text-muted">
        The page you are looking for moved, got deleted, or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 font-semibold text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </section>
  );
}
