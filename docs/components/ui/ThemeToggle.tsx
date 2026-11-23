"use client";

import { Moon, Sun } from "lucide-react";

/** Inline script for <head>: applies the saved theme before first paint. */
export const themeScript = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

const ThemeToggle = () => {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage can be blocked; the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-card"
    >
      <Moon size={15} strokeWidth={1.75} className="dark:hidden" />
      <Sun size={15} strokeWidth={1.75} className="hidden dark:block" />
    </button>
  );
};

export default ThemeToggle;
