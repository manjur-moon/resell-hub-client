"use client";

import { useAuth } from "@/providers/AuthProvider";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function RoleRoute({ allowedRoles = [], children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ded5cb] border-t-orange-500 dark:border-[#57483f] dark:border-t-orange-400" />
          <p className="mt-4 text-sm font-medium text-[#6f6259] dark:text-[#c9bbb1]">
            Checking permission...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
        <section className="surface-card w-full max-w-md overflow-hidden text-center">
          <div className="h-1 bg-orange-500" />
          <div className="p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <LockKeyhole size={24} />
            </div>
            <p className="mt-5 eyebrow">Access denied</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#211a16] dark:text-white">
              You don&apos;t have permission
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#6f6259] dark:text-[#c9bbb1]">
              This page is available only to {allowedRoles.join(" or ")} users.
            </p>
            <Link href="/dashboard" className="btn-primary mt-6">
              Back to dashboard
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return children;
}
