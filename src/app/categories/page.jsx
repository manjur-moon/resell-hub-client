"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { getProductCategoriesApi } from "@/lib/productsApi";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  Grid3X3,
  Laptop,
  Shirt,
  Sparkles,
} from "lucide-react";
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
  Books: {
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    alt: "Books arranged on library shelves",
    description: "Books, novels, study materials and reading essentials.",
  },
  Gaming: {
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    alt: "Gaming setup with screens and gaming equipment",
    description: "Gaming consoles, accessories and entertainment gear.",
  },
  Others: {
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
    alt: "Assorted everyday lifestyle items",
    description: "Useful everyday items and unique resale finds from across the marketplace.",
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
          <div className="category-intro">
            <div className="category-intro-grid" aria-hidden="true" />
            <div className="category-intro-orb category-intro-orb-one" aria-hidden="true" />
            <div className="category-intro-orb category-intro-orb-two" aria-hidden="true" />

            <div className="relative z-10 grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50/90 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                  <Sparkles size={14} />
                  Discover by category
                </div>

                <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-[#211a16] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.02] dark:text-white">
                  Find the right collection
                  <span className="block text-orange-600 dark:text-orange-400">without the endless scroll.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#6f6259] sm:text-base dark:text-[#c9bbb1]">
                  Move straight into the products you care about. Every collection keeps relevant resale listings grouped and easier to explore.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href="/products" className="btn-primary">
                    Browse all listings
                    <ArrowRight size={16} />
                  </Link>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-[#ded5cb] bg-white/65 px-4 py-2.5 text-sm font-semibold text-[#584940] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-[#e2d7ce]">
                    <Grid3X3 size={16} className="text-orange-500" />
                    {isLoading ? "Loading collections" : `${categories.length} curated collections`}
                  </div>
                </div>
              </div>

              <div className="category-orbit" aria-label="Popular category shortcuts">
                <div className="category-orbit-ring category-orbit-ring-one" aria-hidden="true" />
                <div className="category-orbit-ring category-orbit-ring-two" aria-hidden="true" />

                <div className="category-orbit-hub" aria-hidden="true">
                  <div className="category-orbit-hub-glow" />
                  <Grid3X3 size={30} />
                </div>

                <Link
                  href="/products?category=Electronics"
                  className="category-float-card category-float-one"
                >
                  <span className="category-float-icon"><Laptop size={18} /></span>
                  <span>
                    <strong>Electronics</strong>
                    <small>Tech & devices</small>
                  </span>
                </Link>

                <Link
                  href="/products?category=Gaming"
                  className="category-float-card category-float-two"
                >
                  <span className="category-float-icon"><Gamepad2 size={18} /></span>
                  <span>
                    <strong>Gaming</strong>
                    <small>Play & gear</small>
                  </span>
                </Link>

                <Link
                  href="/products?category=Fashion"
                  className="category-float-card category-float-three"
                >
                  <span className="category-float-icon"><Shirt size={18} /></span>
                  <span>
                    <strong>Fashion</strong>
                    <small>Wear it again</small>
                  </span>
                </Link>

                <Link
                  href="/products?category=Books"
                  className="category-float-card category-float-four"
                >
                  <span className="category-float-icon"><BookOpen size={18} /></span>
                  <span>
                    <strong>Books</strong>
                    <small>Read & reuse</small>
                  </span>
                </Link>
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
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#fbf8f4]/55 dark:to-[#130e0c]/58" />
                      <img
                        src={visual.image}
                        alt={visual.alt}
                        loading="lazy"
                        className="absolute bottom-0 right-0 h-full w-full object-cover opacity-95 saturate-[1.08] contrast-[1.06] transition duration-500 group-hover:scale-105 group-hover:opacity-100 dark:opacity-82 dark:saturate-[1.06] dark:contrast-[1.08] dark:brightness-[0.94] dark:group-hover:opacity-95"
                      />
                    </div>

                    <ArrowRight
                      size={18}
                      className="absolute right-6 top-6 z-10 text-[#9a8980] transition duration-300 group-hover:translate-x-1 group-hover:text-orange-500 dark:text-white/45 dark:group-hover:text-orange-400"
                    />

                    <div className="relative z-10 flex min-h-[197px] w-[44%] flex-col items-start justify-center text-left">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9e877a] dark:text-[#a58e82]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-8 text-[1.6rem] font-semibold tracking-[-0.03em] text-[#211a16] dark:text-white">
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
