import { REPO_FALLBACK, SITE } from "./data";

const API = "https://api.github.com";

async function ghJson(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return res.json();
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

// Pinned list mirrors the GitHub profile pins (REST has no pinned endpoint).
export const PINNED = Object.keys(REPO_FALLBACK);

export async function getPinnedRepos() {
  const settled = await Promise.allSettled(
    PINNED.map((name) => ghJson(`/repos/${SITE.handle}/${name}`))
  );
  return settled.map((r, i) =>
    r.status === "fulfilled" ? shapeRepo(r.value) : fallbackRepo(PINNED[i])
  );
}

export async function getRecentRepos(limit = 6) {
  try {
    const repos = await ghJson(
      `/users/${SITE.handle}/repos?sort=pushed&per_page=${limit}`
    );
    return repos.map(shapeRepo);
  } catch {
    return [];
  }
}

export async function getProfile() {
  try {
    const d = await ghJson(`/users/${SITE.handle}`);
    return {
      name: d.name || SITE.name,
      bio: d.bio || "",
      repos: d.public_repos ?? 0,
      followers: d.followers ?? 0,
      avatar: d.avatar_url || SITE.avatar,
    };
  } catch {
    return null;
  }
}
