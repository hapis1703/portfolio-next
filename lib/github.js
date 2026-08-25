import { REPO_FALLBACK, SITE } from "./data";

const API = "https://api.github.com";
const PROFILE_URL = `https://github.com/${SITE.handle}`;
const TTL = 60 * 60 * 1000;

// ponytail: in-memory cache, one copy per server instance; switch to
// unstable_cache/KV if this ever runs multi-instance.
const memo = new Map();

async function ghJson(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    // no-store: caching handled here so failures are never cached
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return res.json();
}

async function cached(key, fn) {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.value;
  const value = await fn();
  memo.set(key, { at: Date.now(), value });
  return value;
}

// GitHub REST has no pinned-repos endpoint. Scrape the profile page HTML;
// pinned cards are the first unique repo links on the page.
async function fetchPinnedNames() {
  const res = await fetch(PROFILE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Profile ${res.status}`);
  const html = await res.text();

  const names = [];
  for (const m of html.matchAll(/href="\/hapis1703\/([A-Za-z0-9._-]+)"/g)) {
    const name = m[1];
    if (name === SITE.handle || name === SITE.handle + ".github.io") continue;
    if (!names.includes(name)) names.push(name);
    if (names.length >= 6) break;
  }
  return names;
}

function shapeRepo(d) {
  return {
    name: d.name,
    description: d.description || REPO_FALLBACK[d.name] || "GitHub project.",
    language: d.language || "Code",
    stars: d.stargazers_count ?? 0,
    url: d.html_url,
    pushedAt: d.pushed_at,
  };
}

function fallbackRepo(name) {
  return {
    name,
    description: REPO_FALLBACK[name] || "GitHub project.",
    language: "Code",
    stars: 0,
    url: `${SITE.github}/${name}`,
    pushedAt: null,
  };
}

export async function getPinnedRepos() {
  return cached("pinned", async () => {
    let names;
    try {
      names = await fetchPinnedNames();
      if (!names.length) throw new Error("no pins found");
    } catch {
      names = Object.keys(REPO_FALLBACK).slice(0, 6);
    }
    const settled = await Promise.allSettled(
      names.map((name) => ghJson(`/repos/${SITE.handle}/${name}`))
    );
    return settled.map((r, i) =>
      r.status === "fulfilled" ? shapeRepo(r.value) : fallbackRepo(names[i])
    );
  });
}

export async function getRecentRepos(limit = 6) {
  return cached(`recent-${limit}`, async () => {
    const repos = await ghJson(
      `/users/${SITE.handle}/repos?sort=pushed&per_page=${limit}`
    );
    return repos.map(shapeRepo);
  }).catch(() => []);
}

export async function getProfile() {
  return cached("profile", async () => {
    const d = await ghJson(`/users/${SITE.handle}`);
    return {
      name: d.name || SITE.name,
      bio: d.bio || "",
      repos: d.public_repos ?? 0,
      followers: d.followers ?? 0,
      avatar: d.avatar_url || SITE.avatar,
    };
  }).catch(() => null);
}
