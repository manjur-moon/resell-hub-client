"use client";

import { useAuth } from "@/providers/AuthProvider";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;
    if (user.role === "admin") return router.replace("/dashboard/admin");
    if (user.role === "seller") return router.replace("/dashboard/seller");
    router.replace("/dashboard/buyer");
  }, [loading, user, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded-lg border border-[#ded5cb] bg-[#fbf8f4] px-5 py-4 text-sm font-medium text-[#6f6259] shadow-sm dark:border-[#3a2f28] dark:bg-[#17120f] dark:text-[#c9bbb1]">
        <LoaderCircle size={18} className="animate-spin text-orange-500" />
        Preparing your dashboard...
      </div>
    </div>
  );
}
