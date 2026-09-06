import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, ShieldCheck, XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0c0a] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,22,0.14),transparent_30%),radial-gradient(circle_at_84%_78%,rgba(140,92,63,0.12),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:34px_34px]" />

      <section className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/10 bg-[#17120f]/90 shadow-[0_30px_100px_rgba(0,0,0,0.36)] backdrop-blur-xl">
        <div className="h-1 bg-orange-500" />
        <div className="p-7 sm:p-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-semibold text-white/72 transition hover:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
              <BadgeCheck size={18} />
            </span>
            ReSell Hub
          </Link>

          <div className="mt-9 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 text-red-300">
            <XCircle size={28} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            Checkout interrupted
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Your payment was cancelled.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/58">
            No payment was completed. Your order may remain pending until a successful payment is processed, so you can safely review your order before trying again.
          </p>

          <div className="mt-7 rounded-[22px] border border-white/8 bg-white/[0.035] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-orange-400" />
              <div>
                <p className="text-sm font-semibold text-white">No successful charge recorded here</p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  You can return to your orders or continue browsing the marketplace without losing access to your account.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
              Browse products
              <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard/buyer/orders" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              <ArrowLeft size={16} />
              My orders
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
