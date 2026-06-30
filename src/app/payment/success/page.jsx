"use client";
import { confirmPaymentApi } from "@/lib/paymentsApi";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams(); const sessionId = searchParams.get("session_id");
  const { data, isLoading, isError, error } = useQuery({ queryKey: ["confirm-payment", sessionId], queryFn: () => confirmPaymentApi(sessionId), enabled: Boolean(sessionId), retry: false });
  const payment = data?.payment;
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950"><div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">{isLoading && <><div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500"/><h1 className="text-3xl font-black text-slate-950 dark:text-white">Confirming payment...</h1></>}{isError && <><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-100 text-red-600"><ReceiptText size={34}/></div><h1 className="text-3xl font-black text-slate-950 dark:text-white">Payment confirmation failed</h1><p className="mt-3 text-red-500">{error?.response?.data?.message || error.message}</p></>}{payment && <><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-300"><CheckCircle2 size={36}/></div><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">Payment Successful</p><h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Thank you for your purchase</h1><div className="mt-6 rounded-3xl bg-slate-50 p-5 text-left dark:bg-slate-950"><p className="flex justify-between gap-4"><span>Transaction ID</span><strong>{payment.transactionId}</strong></p><p className="mt-3 flex justify-between gap-4"><span>Amount</span><strong>৳{Number(payment.amount).toLocaleString()}</strong></p><p className="mt-3 flex justify-between gap-4"><span>Status</span><strong className="capitalize text-green-600">{payment.paymentStatus}</strong></p></div><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/dashboard/buyer/orders" className="btn-primary">My Orders</Link><Link href="/dashboard/buyer/payments" className="btn-secondary">Payment History</Link></div></>}</div></main>;
}
export default function PaymentSuccessPage() { return <Suspense><PaymentSuccessContent /></Suspense>; }
