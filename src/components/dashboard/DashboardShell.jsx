"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardShell({ children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-[#f3eee8] text-[#211a16] dark:bg-[#0c0908] dark:text-white">
      <DashboardSidebar isOpen={open} onClose={() => setOpen(false)} />

      <div className="min-h-screen lg:pl-72">
        <DashboardHeader onMenuClick={() => setOpen(true)} />
        <main className="relative mx-auto w-full max-w-[1640px] overflow-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-orange-500/[0.05] blur-3xl dark:bg-orange-500/[0.04]" />
          <div className="pointer-events-none absolute left-[12%] top-[32rem] h-80 w-80 rounded-full bg-[#bda895]/10 blur-3xl dark:bg-[#6f5749]/[0.05]" />
          <div className="relative">{children}</div>
        </main>
      </div>
    </div>
  );
}
