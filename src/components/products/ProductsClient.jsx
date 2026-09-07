"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { getProductCategoriesApi, getProductsApi } from "@/lib/productsApi";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  MapPin,
  PackageSearch,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  WalletCards,
} from "lucide-react";
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
        <section className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <div className="products-intro mx-auto max-w-7xl">
            <div className="products-intro-grid" aria-hidden="true" />
            <div className="products-intro-orb products-intro-orb-one" aria-hidden="true" />
            <div className="products-intro-orb products-intro-orb-two" aria-hidden="true" />

            <div className="relative z-10 grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50/90 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                  <Sparkles size={14} />
                  ReSell Hub marketplace
                </div>

                <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-[#211a16] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.02] dark:text-white">
                  Search smarter.
                  <span className="block text-orange-600 dark:text-orange-400">
                    Find better second-hand value.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#6f6259] sm:text-base dark:text-[#c9bbb1]">
                  Search trusted listings and narrow results by category, condition,
                  location and budget without digging through marketplace clutter.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-[#ded5cb] bg-white/65 px-4 py-2.5 text-sm font-semibold text-[#584940] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-[#e2d7ce]">
                    <BadgeCheck size={16} className="text-orange-500" />
                    Verified sellers
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-[#ded5cb] bg-white/65 px-4 py-2.5 text-sm font-semibold text-[#584940] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-[#e2d7ce]">
                    <ShoppingBag size={16} className="text-orange-500" />
                    {total} approved listings
                  </span>
                </div>
              </div>

              <div className="products-radar" aria-label="Marketplace search signals">
                <div className="products-radar-ring products-radar-ring-one" aria-hidden="true" />
                <div className="products-radar-ring products-radar-ring-two" aria-hidden="true" />
                <div className="products-radar-sweep" aria-hidden="true" />

                <div className="products-radar-hub" aria-hidden="true">
                  <div className="products-radar-hub-glow" />
                  <Search size={30} />
                </div>

                <div className="product-signal-card product-signal-one">
                  <span className="product-signal-icon"><ShoppingBag size={17} /></span>
                  <span>
                    <strong>{total} listings</strong>
                    <small>Available now</small>
                  </span>
                </div>

                <div className="product-signal-card product-signal-two">
                  <span className="product-signal-icon"><MapPin size={17} /></span>
                  <span>
                    <strong>Location</strong>
                    <small>Search by area</small>
                  </span>
                </div>

                <div className="product-signal-card product-signal-three">
                  <span className="product-signal-icon"><WalletCards size={17} /></span>
                  <span>
                    <strong>Budget</strong>
                    <small>Set your range</small>
                  </span>
                </div>

                <div className="product-signal-card product-signal-four">
                  <span className="product-signal-icon"><SlidersHorizontal size={17} /></span>
                  <span>
                    <strong>Refine</strong>
                    <small>Condition & sort</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-6 max-w-7xl sm:mt-7">
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