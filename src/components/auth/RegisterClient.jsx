"use client";

import {
  becomeSellerApi,
  loginWithGoogle,
  registerWithEmail,
} from "@/lib/authApi";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ShoppingBag,
  Store,
  UserPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const benefits = [
  "Choose a buyer or seller account",
  "Get a role-focused dashboard",
  "Manage marketplace activity in one place",
];

export default function RegisterClient() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      role: "buyer",
      phone: "",
      location: "",
    },
  });

  const selectedRole = watch("role");

  const registerMutation = useMutation({
    mutationFn: async (formData) => {
      await registerWithEmail({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image,
      });

      await refreshUser();

      if (formData.role === "seller") {
        await becomeSellerApi({
          phone: formData.phone,
          location: formData.location,
        });
        await refreshUser();
      }

      return true;
    },
    onSuccess: () => {
      toast.success("Registration successful.");
      router.push("/dashboard");
    },
    onError: (error) => toast.error(error.message || "Registration failed."),
  });

  const googleMutation = useMutation({
    mutationFn: loginWithGoogle,
    onError: (error) => toast.error(error.message || "Google login failed."),
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ece6de] px-4 py-5 dark:bg-[#090705] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-500/10" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#c9b7a6]/25 blur-3xl dark:bg-orange-950/10" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/60 bg-[#fbf8f4] shadow-[0_32px_100px_rgba(35,24,18,0.18)] dark:border-white/8 dark:bg-[#15110f] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative min-h-[310px] overflow-hidden bg-[#0f0c0a] p-6 text-white sm:p-8 lg:min-h-0 lg:p-10">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=85&w=1800&auto=format&fit=crop"
            alt="Premium laptop workspace"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c0a]/95 via-[#0f0c0a]/80 to-[#0f0c0a]/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.24),transparent_38%)]" />

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 shadow-[0_8px_24px_rgba(249,115,22,0.3)]">
                  <ShoppingBag size={20} />
                </span>
                <span>ReSell Hub</span>
              </Link>

              <div className="mt-9 max-w-xl lg:mt-16 lg:max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-orange-200 backdrop-blur-md">
                  <BadgeCheck size={14} />
                  Join the marketplace
                </span>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.03]">
                  One account. Two ways to use the marketplace.
                </h1>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/66 sm:text-base">
                  Start as a buyer or seller and get the dashboard, actions and workflows that match your role.
                </p>
              </div>
            </div>

            <div className="mt-8 hidden max-w-md border-t border-white/12 pt-6 lg:block">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">
                Built around real marketplace roles
              </p>
              <div className="space-y-3.5">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 text-sm text-white/72">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="bg-[#fbf8f4] p-6 dark:bg-[#15110f] sm:p-9 lg:p-11 xl:p-12">
          <div className="mx-auto w-full max-w-lg">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f6259] transition hover:text-orange-600 dark:text-[#c9bbb1] dark:hover:text-orange-400"
            >
              <ArrowLeft size={17} />
              Back to home
            </Link>

            <div className="mt-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600 shadow-[0_8px_22px_rgba(249,115,22,0.08)] dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
                <UsersRound size={22} />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                Create an account
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[#211a16] dark:text-white sm:text-[2.15rem]">
                Start your ReSell Hub journey
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#807168] dark:text-[#9a8980]">
                Add your basic details, then choose how you want to use the marketplace.
              </p>
            </div>

            <form
              onSubmit={handleSubmit((data) => registerMutation.mutate(data))}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                    Full name
                  </span>
                  <input
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="input-control h-12"
                    {...register("name", { required: true })}
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                    Email address
                  </span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="input-control h-12"
                    {...register("email", { required: true })}
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                    Password
                  </span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    className="input-control h-12"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                    Photo URL <span className="font-normal text-[#9a8980]">(optional)</span>
                  </span>
                  <input
                    placeholder="https://..."
                    className="input-control h-12"
                    {...register("image")}
                  />
                </label>
              </div>

              <fieldset>
                <legend className="mb-2 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                  Account type
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`group cursor-pointer rounded-2xl border p-4 transition ${
                      selectedRole === "buyer"
                        ? "border-orange-400 bg-orange-50 shadow-[0_8px_22px_rgba(249,115,22,0.08)] dark:border-orange-500/50 dark:bg-orange-500/10"
                        : "border-[#ded5cb] bg-white hover:border-orange-300 dark:border-[#3a2f28] dark:bg-[#1a1411] dark:hover:border-orange-500/35"
                    }`}
                  >
                    <input type="radio" value="buyer" className="sr-only" {...register("role")} />
                    <div className="flex items-start gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${selectedRole === "buyer" ? "bg-orange-500 text-white" : "bg-[#f2ebe3] text-[#79695f] dark:bg-[#2a211c] dark:text-[#c9bbb1]"}`}>
                        <UsersRound size={18} />
                      </span>
                      <div>
                        <p className="font-semibold text-[#211a16] dark:text-white">Buyer</p>
                        <p className="mt-1 text-xs leading-5 text-[#807168] dark:text-[#9a8980]">
                          Browse, save and purchase listings.
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`group cursor-pointer rounded-2xl border p-4 transition ${
                      selectedRole === "seller"
                        ? "border-orange-400 bg-orange-50 shadow-[0_8px_22px_rgba(249,115,22,0.08)] dark:border-orange-500/50 dark:bg-orange-500/10"
                        : "border-[#ded5cb] bg-white hover:border-orange-300 dark:border-[#3a2f28] dark:bg-[#1a1411] dark:hover:border-orange-500/35"
                    }`}
                  >
                    <input type="radio" value="seller" className="sr-only" {...register("role")} />
                    <div className="flex items-start gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${selectedRole === "seller" ? "bg-orange-500 text-white" : "bg-[#f2ebe3] text-[#79695f] dark:bg-[#2a211c] dark:text-[#c9bbb1]"}`}>
                        <Store size={18} />
                      </span>
                      <div>
                        <p className="font-semibold text-[#211a16] dark:text-white">Seller</p>
                        <p className="mt-1 text-xs leading-5 text-[#807168] dark:text-[#9a8980]">
                          List products and manage sales.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </fieldset>

              {selectedRole === "seller" && (
                <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-4 dark:border-orange-500/20 dark:bg-orange-500/[0.06]">
                  <div className="mb-4 flex items-center gap-2">
                    <Store size={17} className="text-orange-600 dark:text-orange-400" />
                    <p className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                      Seller profile details
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="mb-2 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                        Phone
                      </span>
                      <input
                        placeholder="Phone number"
                        className="input-control h-12"
                        {...register("phone", {
                          required: selectedRole === "seller",
                        })}
                      />
                    </label>

                    <label>
                      <span className="mb-2 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                        Location
                      </span>
                      <input
                        placeholder="e.g. Dhaka"
                        className="input-control h-12"
                        {...register("location", {
                          required: selectedRole === "seller",
                        })}
                      />
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="btn-primary h-12 w-full justify-center rounded-xl"
              >
                <UserPlus size={18} />
                {registerMutation.isPending ? "Creating account..." : "Create account"}
                {!registerMutation.isPending && <ArrowRight size={17} />}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#ddd3c9] dark:bg-[#2a211c]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8980]">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-[#ddd3c9] dark:bg-[#2a211c]" />
            </div>

            <button
              type="button"
              onClick={() => googleMutation.mutate()}
              disabled={googleMutation.isPending}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#d9cec3] bg-white px-4 text-sm font-semibold text-[#3a302a] transition hover:border-orange-300 hover:bg-[#fffaf5] dark:border-[#3a2f28] dark:bg-[#1b1512] dark:text-white dark:hover:border-orange-500/45 dark:hover:bg-[#201813]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e5ddd5] bg-white text-sm font-bold text-[#4285F4] shadow-sm">
                G
              </span>
              {googleMutation.isPending ? "Connecting..." : "Continue with Google"}
            </button>

            <p className="mt-7 text-center text-sm text-[#807168] dark:text-[#9a8980]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
