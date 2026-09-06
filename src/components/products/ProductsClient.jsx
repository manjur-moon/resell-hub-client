"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { getProductCategoriesApi, getProductsApi } from "@/lib/productsApi";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, PackageSearch, ShoppingBag, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

function clean(obj) {
  const cleaned = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key] = value;
    }
  });

  return cleaned;
}

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      condition: searchParams.get("condition") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      location: searchParams.get("location") || "",
      sort: searchParams.get("sort") || "newest",
      page: searchParams.get("page") || "1",
      limit: "12",
    }),
    [searchParams]
  );

  const updateUrl = (nextQuery) => {
    const params = new URLSearchParams();

    Object.entries(clean(nextQuery)).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`/products?${params.toString()}`);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", query],
    queryFn: () => getProductsApi(query),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategoriesApi,
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 0;
  const page = Number(data?.page || query.page || 1);

  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#f4f1eb] pb-16 dark:bg-[#0f0c0a]">
        <section className="relative overflow-hidden bg-[#0f0c0a] px-4 pb-24 pt-10 text-white sm:px-6 sm:pb-28 sm:pt-12 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(249,115,22,0.16),transparent_33%),radial-gradient(circle_at_10%_90%,rgba(255,255,255,0.055),transparent_28%)]" />
          <div className="pointer-events-none absolute -right-16 top-12 h-72 w-72 rounded-full border border-white/[0.045]" />
          <div className="pointer-events-none absolute -right-5 top-24 h-52 w-52 rounded-full border border-orange-500/10" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-orange-300">
                  <Sparkles size={13} />
                  ReSell Hub marketplace
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.8rem]">
                  Find quality pre-owned products without the clutter.
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#c9bbb1] sm:text-base">
                  Search trusted listings, compare prices and narrow products by
                  category, condition, location and budget across Bangladesh.
                </p>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={16} className="text-orange-400" />
                    Verified sellers
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShoppingBag size={16} className="text-orange-400" />
                    Approved listings
                  </span>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-md lg:justify-self-end lg:min-w-64">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a89589]">
                  Available products
                </p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <span className="text-5xl font-semibold tracking-[-0.05em] text-white">
                    {total}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-[0_10px_24px_rgba(249,115,22,0.25)]">
                    <ShoppingBag size={20} />
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-white/45">
                  Marketplace inventory matching your current search.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto -mt-14 max-w-7xl sm:-mt-16">
            <ProductFilters
              initialFilters={query}
              categories={categoryData?.categories || []}
              onApply={(filters) =>
                updateUrl({ ...filters, page: "1", limit: "12" })
              }
              onReset={() => router.push("/products")}
            />
          </div>
        </section>

        <section className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 border-b border-[#d9cfc5] pb-6 dark:border-[#342922] sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
                  Marketplace results
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[#211a16] dark:text-white">
                  All products
                </h2>
              </div>
              <p className="text-sm text-[#807168] dark:text-[#9a8980]">
                Showing <span className="font-semibold text-[#4f4138] dark:text-[#ded2ca]">{products.length}</span> of {total} products
              </p>
            </div>

            {isLoading && (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            )}

            {isError && (
              <div className="mt-8 rounded-[24px] border border-red-200 bg-[#fbf8f4] p-10 text-center shadow-[0_14px_36px_rgba(36,24,17,0.06)] dark:border-red-900/60 dark:bg-[#17120f]">
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                  Products could not be loaded
                </h3>
                <p className="mt-2 text-sm text-[#807168] dark:text-[#9a8980]">
                  Please refresh the page or try again in a moment.
                </p>
              </div>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <div className="mt-8 rounded-[24px] border border-[#ddd2c6] bg-[#fbf8f4] p-12 text-center shadow-[0_14px_36px_rgba(36,24,17,0.06)] dark:border-[#332820] dark:bg-[#17120f]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17120f] text-orange-400 dark:bg-orange-500/10">
                  <PackageSearch size={27} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#211a16] dark:text-white">
                  No products found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#807168] dark:text-[#9a8980]">
                  Try changing your search, category, location or price range to discover more listings.
                </p>
              </div>
            )}

            {!isLoading && !isError && products.length > 0 && (
              <>
                <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={(nextPage) =>
                    updateUrl({
                      ...query,
                      page: String(nextPage),
                      limit: "12",
                    })
                  }
                />
              </>
            )}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
