"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageItems(current, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
  }

  if (current >= totalPages - 3) {
    return [
      1,
      "start-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "start-ellipsis",
    current - 1,
    current,
    current + 1,
    "end-ellipsis",
    totalPages,
  ];
}

export default function Pagination({ page = 1, totalPages = 1, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const current = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const pageItems = getPageItems(current, totalPages);

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2 rounded-[22px] border border-[#ddd2c6] bg-[#fbf8f4] p-3 shadow-[0_12px_34px_rgba(36,24,17,0.05)] dark:border-[#332820] dark:bg-[#17120f]"
      aria-label="Product pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#d4c8bd] bg-white/70 px-3 text-sm font-semibold text-[#5d4f46] transition hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#483a31] dark:bg-[#211a16] dark:text-[#ded2ca] dark:hover:border-orange-500 dark:hover:text-orange-400"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pageItems.map((item) => {
        if (typeof item === "string") {
          return (
            <span
              key={item}
              className="inline-flex h-10 min-w-8 items-center justify-center text-sm font-semibold text-[#9a8980]"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        return (
          <button
            type="button"
            key={item}
            onClick={() => onPageChange(item)}
            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition ${
              item === current
                ? "border-orange-500 bg-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.24)]"
                : "border-transparent bg-transparent text-[#68584e] hover:border-[#d5c9be] hover:bg-white/65 hover:text-orange-600 dark:text-[#cfc0b6] dark:hover:border-[#493b32] dark:hover:bg-[#211a16] dark:hover:text-orange-400"
            }`}
            aria-current={item === current ? "page" : undefined}
            aria-label={`Page ${item}`}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(current + 1)}
        disabled={current >= totalPages}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#d4c8bd] bg-white/70 px-3 text-sm font-semibold text-[#5d4f46] transition hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#483a31] dark:bg-[#211a16] dark:text-[#ded2ca] dark:hover:border-orange-500 dark:hover:text-orange-400"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
