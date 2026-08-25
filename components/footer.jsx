"use client";

import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import { NAV, SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {SITE.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted">
          {NAV.slice(1, 5).map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-accent transition-colors">
              {n.label}
            </Link>
          ))}
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:text-accent transition-colors"
          >
            <IconBrandGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
