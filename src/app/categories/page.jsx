"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { getProductCategoriesApi } from "@/lib/productsApi";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Grid3X3 } from "lucide-react";
import Link from "next/link";

const categoryVisuals = {
  Electronics: {
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    alt: "Laptop and technology workspace",
    description: "Laptops, gadgets, accessories and everyday tech finds.",
  },
  "Mobile Phones": {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    alt: "Smartphone product photo",
    description: "Pre-owned phones, smartphones and mobile accessories.",
  },
  Furniture: {
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern furniture chair",
    description: "Home and office furniture with practical second-life value.",
  },
  Vehicles: {
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    alt: "Car front profile",
    description: "Cars, bikes and transport-related used listings.",
  },
  Fashion: {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    alt: "Fashion clothing items",
    description: "Clothing, wearable items and fashion staples.",
  },
  "Home Appliances": {
    image:
      "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=1200&q=80",
    alt: "Home appliance setup",
    description: "Useful appliances for kitchen, home and daily living.",
  },
};

const getCategoryVisual = (category) =>
  categoryVisuals[category] || {
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
    alt: `${category} category image`,
    description: "Explore curated resale listings from this collection.",
  };

export default function CategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories-page"],
    queryFn: getProductCategoriesApi,
  });

  const categories = data?.categories || [];

  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#f4f1eb]/70 px-4 py-8 dark:bg-[#0f0c0a] sm:py-10">
        <section className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[28px] border border-[#3a2f28] bg-[#17120f] text-white shadow-[0_18px_50px_rgba(35,24,18,0.14)]">
            <div className="h-1 bg-orange-500" />
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Browse by category
                </p>
                <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                  Explore the marketplace by what you need.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#c9bbb1]">
                  Jump directly into electronics, furniture, vehicles, fashion,
                  mobile phones and other pre-owned product collections.
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                <Grid3X3 size={26} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between gap-4 border-b border-[#ded5cb] pb-5 dark:border-[#3a2f28]">
            <div>
              <p className="eyebrow">All categories</p>
              <h2 className="mt-1 text-2xl font-semibold text-[#211a16] dark:text-white">
                Choose a category
              </h2>
            </div>
            {!isLoading && (
              <span className="text-sm text-[#807168] dark:text-[#9a8980]">
                {categories.length} available
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-52 animate-pulse rounded-[26px] border border-[#ded5cb] bg-[#fbf8f4] dark:border-[#3a2f28] dark:bg-[#17120f]"
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category, index) => {
                const visual = getCategoryVisual(category);

                return (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="group relative min-h-[245px] overflow-hidden rounded-[26px] border border-[#ddd2c6] bg-[#fbf8f4] p-6 text-[#211a16] shadow-[0_16px_40px_rgba(35,24,18,0.06)] transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_24px_48px_rgba(35,24,18,0.12)] dark:border-[#2f241d] dark:bg-[#130e0c] dark:text-white dark:hover:border-orange-500/45"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbf8] via-[#f4eee7] to-[#ece3d8] dark:from-[#1a1411] dark:via-[#140f0d] dark:to-[#0f0c0a]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.13),transparent_40%)]" />

                    <div className="absolute inset-y-0 right-0 w-[52%] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#fbf8f4]/95 dark:to-[#130e0c]/92" />
                      <img
                        src={visual.image}
                        alt={visual.alt}
                        loading="lazy"
                        className="absolute bottom-0 right-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-75 dark:opacity-35 dark:group-hover:opacity-45"
                      />
                    </div>

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9e877a] dark:text-[#a58e82]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ArrowRight
                          size={18}
                          className="text-[#9a8980] transition duration-300 group-hover:translate-x-1 group-hover:text-orange-500 dark:text-white/45 dark:group-hover:text-orange-400"
                        />
                      </div>

                      <div className="max-w-[62%]">
                        <h3 className="text-[1.6rem] font-semibold tracking-[-0.03em] text-[#211a16] dark:text-white">
                          {category}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-[#6f6259] dark:text-white/62">
                          {visual.description}
                        </p>
                        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400">
                          Browse items
                          <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </PublicLayout>
  );
}
