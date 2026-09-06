"use client";

import { useAuth } from "@/providers/AuthProvider";
import { ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1eb]/70 px-4 dark:bg-[#0f0c0a]">
        <div className="surface-card w-full max-w-sm p-7 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <ShieldCheck size={22} />
          </div>
          <div className="mx-auto mt-5 h-8 w-8 animate-spin rounded-full border-2 border-[#ded5cb] border-t-orange-500 dark:border-[#57483f] dark:border-t-orange-400" />
          <p className="mt-4 text-sm font-medium text-[#584940] dark:text-[#e2d7ce]">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return children;
}
