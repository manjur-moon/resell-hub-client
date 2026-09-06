"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Menu, Sparkles } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle";

export default function DashboardHeader({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-[#ded5cb]/80 bg-[#f6f1eb]/88 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#0c0908]/88">
      <div className="flex h-[76px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d7ccc1] bg-[#fbf8f4] text-[#584940] shadow-sm transition hover:border-orange-300 hover:text-orange-600 dark:border-[#3a2f28] dark:bg-[#17120f] dark:text-[#e2d7ce] dark:hover:border-orange-500/40 dark:hover:text-orange-300 lg:hidden"
          aria-label="Open dashboard menu"
        >
          <Menu size={19} />
        </button>

        <div className="hidden min-w-0 md:block">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-orange-500" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
              ReSell Hub Workspace
            </p>
          </div>
          <p className="mt-1 text-sm text-[#7b6d63] dark:text-white/42">
            A focused operating view for your marketplace activity.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <div className="flex items-center gap-2.5 rounded-2xl border border-[#ded5cb] bg-[#fbf8f4]/80 p-1.5 pr-3 shadow-sm dark:border-[#30261f] dark:bg-[#15110f]/85">
            <img
              src={user?.photo || user?.image || "https://i.pravatar.cc/120?img=12"}
              alt={user?.name || "User"}
              className="h-9 w-9 rounded-xl object-cover ring-1 ring-[#ded5cb] dark:ring-white/10"
            />
            <div className="hidden min-w-0 sm:block">
              <p className="max-w-40 truncate text-[13px] font-semibold text-[#2d241f] dark:text-white">
                {user?.name || "User"}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a8980] dark:text-white/35">
                {user?.role || "buyer"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
