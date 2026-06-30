"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-orange-500 dark:hover:text-orange-400"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={!mounted}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}