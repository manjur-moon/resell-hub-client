"use client";

import { confirmPaymentApi } from "@/lib/paymentsApi";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["confirm-payment", sessionId],
    queryFn: () => confirmPaymentApi(sessionId),
    enabled: Boolean(sessionId),
    retry: false,
  });

  const payment = data?.payment;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0c0a] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,22,0.14),transparent_31%),radial-gradient(circle_at_84%_80%,rgba(121,92,61,0.12),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:34px_34px]" />

      <section className="relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/10 bg-[#17120f]/92 shadow-[0_30px_100px_rgba(0,0,0,0.36)] backdrop-blur-xl">
        <div className="h-1 bg-orange-500" />
        <div className="p-7 sm:p-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-semibold text-white/72 transition hover:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
              <BadgeCheck size={18} />
            </span>
            ReSell Hub
          </Link>

          {!sessionId && (
            <div className="mt-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/15 bg-orange-500/10 text-orange-300">
                <ReceiptText size={28} />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                Payment status
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                This payment link is incomplete.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
                We couldn&apos;t find a Stripe session ID in this URL. Return to your orders or browse the marketplace to continue safely.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard/buyer/orders" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                  Check my orders
                  <ArrowRight size={16} />
                </Link>
                <Link href="/products" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                  Browse products
                </Link>
              </div>
            </div>
          )}

          {sessionId && isLoading && (
            <div className="py-10 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/12 border-t-orange-400" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                Payment status
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Confirming your payment.
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/55">
                We&apos;re verifying the transaction with the payment provider and preparing your order record.
              </p>
            </div>
          )}

          {sessionId && isError && (
            <div className="mt-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 text-red-300">
                <ReceiptText size={28} />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                Payment status
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Payment confirmation failed.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-red-200/80">
                {error?.response?.data?.message || error?.message || "We could not confirm this transaction."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard/buyer/orders" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                  Check my orders
                  <ArrowRight size={16} />
                </Link>
                <Link href="/products" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                  Browse products
                </Link>
              </div>
            </div>
          )}

          {sessionId && payment && (
            <div className="mt-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-500/10 text-emerald-300">
                <CheckCircle2 size={29} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                Payment confirmed
              </p>
              <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
                <div>
                  <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    Your purchase is confirmed.
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/58">
                    The payment has been verified and your order is now available in your buyer dashboard.
                  </p>
                </div>

                <div className="rounded-[22px] border border-emerald-400/10 bg-emerald-500/[0.055] p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                    <div>
                      <p className="text-sm font-semibold text-white">Secure confirmation complete</p>
                      <p className="mt-1 text-xs leading-5 text-white/42">
                        Your transaction details are recorded with the order for later reference.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <dl className="mt-8 divide-y divide-white/8 overflow-hidden rounded-[24px] border border-white/9 bg-white/[0.035] px-5">
                <PaymentRow label="Transaction ID" value={payment.transactionId} />
                <PaymentRow label="Amount" value={`৳${Number(payment.amount).toLocaleString()}`} />
                <div className="flex items-center justify-between gap-4 py-4 text-sm">
                  <dt className="text-white/42">Status</dt>
                  <dd className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-3 py-1.5 font-semibold capitalize text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    {payment.paymentStatus}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard/buyer/orders" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                  View my orders
                  <ArrowRight size={16} />
                </Link>
                <Link href="/dashboard/buyer/payments" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                  Payment history
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function PaymentRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 text-sm">
      <dt className="text-white/42">{label}</dt>
      <dd className="max-w-[68%] break-all text-right font-semibold text-white/85">
        {value}
      </dd>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#0f0c0a] text-white">
          <div className="text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/12 border-t-orange-400" />
            <p className="mt-4 text-sm text-white/55">Preparing payment confirmation...</p>
          </div>
        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
