import ProductsClient from "@/components/products/ProductsClient";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { Suspense } from "react";

function Loading() {
  return (
    <main className="min-h-screen bg-[#f4f1eb] pb-16 dark:bg-[#0f0c0a]">
      <section className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="products-intro mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="h-7 w-52 animate-pulse rounded-full bg-orange-100 dark:bg-orange-500/10" />
          <div className="mt-6 h-16 max-w-3xl animate-pulse rounded-2xl bg-[#eadfd5] dark:bg-white/[0.07]" />
          <div className="mt-5 h-6 max-w-2xl animate-pulse rounded bg-[#eadfd5] dark:bg-white/[0.05]" />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-6 max-w-7xl rounded-[26px] border border-[#d9cec3] bg-[#fbf8f4] p-6 shadow-[0_24px_70px_rgba(36,24,17,0.10)] dark:border-[#3b2f27] dark:bg-[#17120f]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-11 animate-pulse rounded-xl bg-[#e7ded6] dark:bg-[#2b211c]" />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-9 w-52 animate-pulse rounded bg-[#ded4ca] dark:bg-[#2b211c]" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsClient />
    </Suspense>
  );
}