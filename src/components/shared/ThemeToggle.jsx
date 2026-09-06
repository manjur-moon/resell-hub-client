"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ overlay = false }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 items-center justify-center border shadow-sm transition ${
        overlay
          ? "rounded-full border-[#d8cdc2] bg-[#fffaf4]/90 text-[#5d4e46] backdrop-blur-md hover:border-[#cbb8a7] hover:bg-white hover:text-orange-600 dark:border-white/20 dark:bg-[#fbf8f4]/10 dark:text-white dark:hover:border-white/35 dark:hover:bg-[#fbf8f4]/15 dark:hover:text-white"
          : "rounded-md border-[#c9bdb2] bg-[#fbf8f4] text-[#6f6259] hover:bg-[#f7f2ec] hover:text-orange-600 dark:border-[#57483f] dark:bg-[#17120f] dark:text-[#c9bbb1] dark:hover:bg-[#2a211c] dark:hover:text-orange-400"
      }`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={!mounted}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
