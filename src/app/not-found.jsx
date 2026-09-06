import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0c0a] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,22,0.15),transparent_30%),radial-gradient(circle_at_84%_80%,rgba(138,91,64,0.11),transparent_33%)]" />
      <div className="pointer-events-none absolute right-[-4rem] top-[-6rem] select-none text-[22rem] font-semibold tracking-[-0.08em] text-white/[0.018] sm:text-[28rem]">
        404
      </div>

      <section className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/10 bg-[#17120f]/92 shadow-[0_30px_100px_rgba(0,0,0,0.36)] backdrop-blur-xl">
        <div className="h-1 bg-orange-500" />
        <div className="p-7 sm:p-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-semibold text-white/72 transition hover:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
              <BadgeCheck size={18} />
            </span>
            ReSell Hub
          </Link>

          <div className="mt-9 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/15 bg-orange-500/10 text-orange-300">
            <SearchX size={28} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            404 · Page not found
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            This listing path went missing.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/58">
            The address may be incorrect, or the page may have moved. Return home or jump straight back into the marketplace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
              <ArrowLeft size={16} />
              Back to home
            </Link>
            <Link href="/products" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              Browse products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
