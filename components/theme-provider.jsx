"use client";

import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

const DEFAULTS = { theme: "modern", mode: "dark" };

function readStored() {
  try {
    const theme = localStorage.getItem("pf-theme");
    const mode = localStorage.getItem("pf-mode");
    return {
      theme: theme || DEFAULTS.theme,
      mode: mode || DEFAULTS.mode,
    };
  } catch {
    return DEFAULTS;
  }
}

export function ThemeProvider({ children }) {
  const [prefs, setPrefs] = useState(DEFAULTS);

  useEffect(() => {
    const stored = readStored();
    if (!localStorage.getItem("pf-mode")) {
      stored.mode = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    setPrefs(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = prefs.theme;
    root.dataset.mode = prefs.mode;
    try {
      localStorage.setItem("pf-theme", prefs.theme);
      localStorage.setItem("pf-mode", prefs.mode);
    } catch {}
  }, [prefs]);

  return (
    <Ctx.Provider value={{ ...prefs, setPrefs }}>{children}</Ctx.Provider>
  );
}

export function useTheme() {
  return useContext(Ctx);
}
