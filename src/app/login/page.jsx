import LoginClient from "@/components/auth/LoginClient";
import { Suspense } from "react";

function LoginFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0c0a] px-4 text-white">
      <div className="text-center" role="status" aria-live="polite">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/12 border-t-orange-400" />
        <p className="mt-4 text-sm font-medium text-white/60">Preparing sign in...</p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginClient />
    </Suspense>
  );
}
