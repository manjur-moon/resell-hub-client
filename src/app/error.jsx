"use client";

import { AlertTriangle, ArrowLeft, BadgeCheck, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0c0a] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.13),transparent_30%),radial-gradient(circle_at_80%_82%,rgba(129,85,60,0.11),transparent_32%)]" />
      <section className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/10 bg-[#17120f]/92 shadow-[0_30px_100px_rgba(0,0,0,0.36)] backdrop-blur-xl">
        <div className="h-1 bg-orange-500" />
        <div className="p-7 sm:p-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-semibold text-white/72 transition hover:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
              <BadgeCheck size={18} />
            </span>
            ReSell Hub
          </Link>

          <div className="mt-9 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 text-red-300">
            <AlertTriangle size={28} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            Application error
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Something didn&apos;t load correctly.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/58">
            {process.env.NODE_ENV === "development" && error?.message
              ? error.message
              : "An unexpected error occurred while loading this page. Please try again."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => reset()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
              <RotateCcw size={16} />
              Try again
            </button>
            <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
