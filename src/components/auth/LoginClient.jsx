"use client";
import { loginWithEmail, loginWithGoogle } from "@/lib/authApi";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginClient() {
  const router = useRouter(); const searchParams = useSearchParams(); const redirect = searchParams.get("redirect") || "/dashboard"; const { refreshUser } = useAuth();
  const { register, handleSubmit } = useForm({ defaultValues: { email: "", password: "" } });
  const loginMutation = useMutation({ mutationFn: loginWithEmail, onSuccess: async () => { await refreshUser(); toast.success("Login successful."); router.push(redirect); }, onError: e => toast.error(e.message || "Login failed.") });
  const googleMutation = useMutation({ mutationFn: loginWithGoogle, onError: e => toast.error(e.message || "Google login failed.") });
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950"><div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-sm dark:bg-slate-900 lg:grid-cols-2"><div className="hidden bg-slate-950 p-10 text-white lg:block"><p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">Welcome Back</p><h1 className="mt-5 text-5xl font-black">Buy and sell smarter with ReSell Hub</h1><p className="mt-5 text-slate-300">Login to manage orders, wishlist, product listings, and secure payments.</p></div><div className="p-6 sm:p-10"><Link href="/" className="text-sm font-bold text-orange-600">← Back Home</Link><h2 className="mt-8 text-3xl font-black text-slate-950 dark:text-white">Login to your account</h2><form onSubmit={handleSubmit(data => loginMutation.mutate(data))} className="mt-7 space-y-4"><input type="email" placeholder="Email address" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950" {...register("email", { required: true })}/><input type="password" placeholder="Password" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950" {...register("password", { required: true })}/><button type="submit" disabled={loginMutation.isPending} className="btn-primary w-full"><LogIn size={18}/>{loginMutation.isPending ? "Logging in..." : "Login"}</button></form><button onClick={() => googleMutation.mutate()} disabled={googleMutation.isPending} className="btn-secondary mt-4 w-full">Continue with Google</button><p className="mt-6 text-center text-sm text-slate-500">New to ReSell Hub? <Link href="/register" className="font-bold text-orange-600">Create account</Link></p></div></div></main>;
}
