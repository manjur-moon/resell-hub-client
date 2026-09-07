"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import ProductCard from "@/components/products/ProductCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import {
  getFeaturedProductsApi,
  getProductCategoriesApi,
} from "@/lib/productsApi";
import {
  getMarketplaceStatsApi,
  getTrustedSellersApi,
} from "@/lib/statsApi";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Boxes,
  CircleDollarSign,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=88&w=2200&auto=format&fit=crop",
    alt: "Premium laptop workspace for a second-hand electronics marketplace",
    eyebrow: "Electronics",
    label: "Tech worth a second life",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=88&w=2200&auto=format&fit=crop",
    alt: "Smartphone ready for a new owner",
    eyebrow: "Mobile",
    label: "Great phones, smarter value",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=88&w=2200&auto=format&fit=crop",
    alt: "Modern furniture ready for resale",
    eyebrow: "Furniture",
    label: "Good pieces deserve another home",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=88&w=2200&auto=format&fit=crop",
    alt: "Fashion items in a curated resale collection",
    eyebrow: "Fashion",
    label: "Style made to be worn again",
  },
];

const categoryVisuals = {
  Electronics: {
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    alt: "Laptop and technology workspace",
  },
  "Mobile Phones": {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    alt: "Smartphone product photo",
  },
  Furniture: {
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    alt: "Modern furniture chair",
  },
  Vehicles: {
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    alt: "Car front profile",
  },
  Fashion: {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    alt: "Fashion clothing items",
  },
  "Home Appliances": {
    image:
      "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=900&q=80",
    alt: "Home appliance setup",
  },
  Books: {
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    alt: "Books arranged on library shelves",
  },
  Gaming: {
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    alt: "Gaming setup with screens and gaming equipment",
  },
  Others: {
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80",
    alt: "Assorted everyday lifestyle items",
  },
};

const getCategoryVisual = (category) =>
  categoryVisuals[category] || {
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    alt: `${category} category image`,
  };

const heroLinks = [
  {
    icon: Store,
    eyebrow: "Marketplace",
    title: "Browse products",
    text: "Explore approved listings",
    href: "/products",
  },
  {
    icon: Boxes,
    eyebrow: "Discover",
    title: "Shop by category",
    text: "Find the right product faster",
    href: "/categories",
  },
  {
    icon: BadgeCheck,
    eyebrow: "Trust",
    title: "Verified sellers",
    text: "Meet trusted marketplace sellers",
    href: "#trusted-sellers",
  },
  {
    icon: CircleDollarSign,
    eyebrow: "Sell",
    title: "List your item",
    text: "Turn unused products into value",
    href: "/register",
  },
];

const benefits = [
  {
    icon: BadgeCheck,
    title: "Verified marketplace",
    text: "Seller verification and listing moderation make trust visible before you buy.",
  },
  {
    icon: ShieldCheck,
    title: "Secure purchase flow",
    text: "A clear checkout experience keeps the buying journey focused and predictable.",
  },
  {
    icon: Leaf,
    title: "Smarter second life",
    text: "Buy quality pre-owned products and keep useful items in circulation longer.",
  },
  {
    icon: PackageCheck,
    title: "Built around listings",
    text: "Condition, seller, location and pricing details stay visible where buyers need them.",
  },
];

export default function HomePage() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (isHeroPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isHeroPaused]);

  const showPreviousSlide = () => {
    setActiveHeroSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  };

  const showNextSlide = () => {
    setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
  };

  const { data: featuredData, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getFeaturedProductsApi({ limit: 8 }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["home-categories"],
    queryFn: getProductCategoriesApi,
  });

  const { data: statsData } = useQuery({
    queryKey: ["marketplace-stats"],
    queryFn: getMarketplaceStatsApi,
  });

  const { data: trustedData } = useQuery({
    queryKey: ["trusted-sellers"],
    queryFn: getTrustedSellersApi,
  });

  const products = featuredData?.products || [];
  const categories = categoriesData?.categories || [
    "Electronics",
    "Mobile Phones",
    "Furniture",
    "Vehicles",
    "Fashion",
  ];
  const stats = statsData?.stats || {};
  const trustedSellers = trustedData?.sellers || [];

  return (
    <PublicLayout>
      <main className="bg-[#f4f1eb] dark:bg-[#0f0c0a]">
        <section
          className="relative isolate min-h-[760px] overflow-hidden bg-[#f8f3ec] text-[#211a16] sm:min-h-[820px] lg:min-h-[860px] dark:bg-[#17120f] dark:text-white"
          aria-roledescription="carousel"
          aria-label="Resell Hub marketplace highlights"
        >
          <div className="absolute inset-0 -z-30">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.image}
                src={slide.image}
                alt={index === activeHeroSlide ? slide.alt : ""}
                aria-hidden={index !== activeHeroSlide}
                loading={index === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover object-center saturate-[1.08] brightness-[1.02] contrast-[1.07] transition-opacity duration-1000 ease-out dark:saturate-100 dark:brightness-100 dark:contrast-100 ${
                  index === activeHeroSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(252,248,243,0.94)_0%,rgba(252,248,243,0.84)_22%,rgba(252,248,243,0.58)_38%,rgba(252,248,243,0.22)_54%,rgba(252,248,243,0.06)_68%,rgba(252,248,243,0)_82%)] dark:bg-[linear-gradient(90deg,rgba(12,9,8,0.94)_0%,rgba(12,9,8,0.82)_38%,rgba(12,9,8,0.48)_70%,rgba(12,9,8,0.62)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,250,244,0.05)_0%,rgba(255,250,244,0)_54%,rgba(248,241,233,0.10)_100%)] dark:bg-[radial-gradient(circle_at_76%_34%,rgba(249,115,22,0.16),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.42))]" />

          <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col px-4 pb-6 pt-32 sm:min-h-[820px] sm:px-6 sm:pt-36 lg:min-h-[860px] lg:px-8 lg:pt-40">
            <div className="flex flex-1 items-center pb-12 lg:pb-10">
              <div className="max-w-3xl py-4 sm:py-6 lg:py-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8cdc2] bg-white/76 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#5d4e46] backdrop-blur-md dark:border-white/15 dark:bg-[#fbf8f4]/10 dark:text-white/80">
                  <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.85)]" />
                  Trusted second-hand marketplace
                </div>

                <h1 className="text-[3.15rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#211a16] drop-shadow-[0_1px_1px_rgba(255,255,255,0.55)] sm:text-6xl md:text-7xl lg:text-[5.25rem] dark:text-white dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.38)]">
                  Find more value.
                  <span className="mt-1 block text-orange-500 dark:text-orange-400">Waste less.</span>
                </h1>

                <p className="mt-7 max-w-xl text-base font-medium leading-7 text-[#3a302a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.55)] sm:text-lg dark:text-white/78 dark:drop-shadow-[0_1px_6px_rgba(0,0,0,0.34)]">
                  Discover quality pre-owned products from trusted sellers, buy
                  securely, or give your unused items a second life.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(249,115,22,0.22)] transition hover:bg-orange-400"
                  >
                    Explore marketplace
                    <ArrowRight size={17} />
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d8cdc2] bg-[#fffaf4]/75 px-6 py-3 text-sm font-semibold text-[#2d241f] backdrop-blur-md transition hover:border-[#cbb8a7] hover:bg-white/85 dark:border-white/25 dark:bg-[#fbf8f4]/10 dark:text-white dark:hover:border-white/45 dark:hover:bg-[#fbf8f4]/15"
                  >
                    Start selling
                  </Link>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-[#3f342e] drop-shadow-[0_1px_1px_rgba(255,255,255,0.55)] dark:text-white/74 dark:drop-shadow-[0_1px_6px_rgba(0,0,0,0.32)]">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={17} className="text-orange-400" />
                    Verified sellers
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={17} className="text-orange-400" />
                    Secure checkout
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Leaf size={17} className="text-orange-400" />
                    Better reuse
                  </span>
                </div>
              </div>

              <div
                className="absolute bottom-[154px] right-4 z-20 hidden items-center gap-2 sm:right-6 lg:flex lg:right-8"
                onMouseEnter={() => setIsHeroPaused(true)}
                onMouseLeave={() => setIsHeroPaused(false)}
                onFocusCapture={() => setIsHeroPaused(true)}
                onBlurCapture={() => setIsHeroPaused(false)}
                aria-label="Hero carousel controls"
              >
                <button
                  type="button"
                  onClick={showPreviousSlide}
                  aria-label="Show previous hero image"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ddcfc1] bg-[#fffaf4]/88 text-[#3b302a] shadow-[0_10px_24px_rgba(35,24,18,0.09)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 dark:border-white/18 dark:bg-black/35 dark:text-white dark:shadow-none dark:hover:border-orange-400/50 dark:hover:text-orange-300"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={showNextSlide}
                  aria-label="Show next hero image"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ddcfc1] bg-[#fffaf4]/88 text-[#3b302a] shadow-[0_10px_24px_rgba(35,24,18,0.09)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 dark:border-white/18 dark:bg-black/35 dark:text-white dark:shadow-none dark:hover:border-orange-400/50 dark:hover:text-orange-300"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div
              className="mb-4 flex items-center justify-center gap-2 lg:hidden"
              aria-label="Hero slide navigation"
              onFocusCapture={() => setIsHeroPaused(true)}
              onBlurCapture={() => setIsHeroPaused(false)}
            >
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  onClick={() => setActiveHeroSlide(index)}
                  aria-label={`Show ${slide.eyebrow} image`}
                  aria-current={index === activeHeroSlide ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeHeroSlide
                      ? "w-7 bg-orange-500"
                      : "w-2.5 bg-[#b9a99b]/70 hover:bg-[#9d8979] dark:bg-white/28 dark:hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {heroLinks.map((item, index) => {
                const Icon = item.icon;
                const featured = index === 2;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`group min-h-[116px] rounded-2xl border p-4 backdrop-blur-xl transition duration-200 sm:p-5 ${
                      featured
                        ? "border-[#e6d9cc] bg-white text-[#211a16] shadow-[0_18px_40px_rgba(35,24,18,0.09)] dark:border-white dark:bg-[#fbf8f4] dark:shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                        : "border-[#e2d6ca] bg-[#fffdf9]/90 text-[#211a16] shadow-[0_12px_32px_rgba(35,24,18,0.07)] hover:border-[#cdb9a8] hover:bg-white dark:border-white/18 dark:bg-black/25 dark:text-white dark:hover:border-white/30 dark:hover:bg-black/35"
                    }`}
                  >
                    <div className="flex h-full items-start justify-between gap-4">
                      <div>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            featured
                              ? "bg-orange-50 text-orange-600"
                              : "bg-orange-50 text-orange-600 dark:bg-[#fbf8f4]/10 dark:text-orange-300"
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <p
                          className={`mt-4 text-xs font-semibold uppercase tracking-[0.13em] ${
                            featured ? "text-orange-600" : "text-[#8c796d] dark:text-white/55"
                          }`}
                        >
                          {item.eyebrow}
                        </p>
                        <p className="mt-1 text-base font-semibold text-[#211a16] dark:text-current">{item.title}</p>
                        <p
                          className={`mt-1 text-xs leading-5 ${
                            featured ? "text-[#807168]" : "text-[#6f6259] dark:text-white/55"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                      <ArrowRight
                        size={17}
                        className={`mt-auto shrink-0 transition group-hover:translate-x-1 ${
                          featured ? "text-[#807168]" : "text-[#7a6b60] dark:text-white/65"
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f1eb] px-4 py-16 sm:px-6 md:py-20 lg:px-8 dark:bg-[#0f0c0a]">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                Marketplace intelligence
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#211a16] sm:text-4xl md:text-5xl dark:text-white">
                Everything you need for a more confident resale experience
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {benefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`relative px-1 sm:px-5 lg:px-7 ${
                      index !== 0
                        ? "lg:before:absolute lg:before:inset-y-2 lg:before:left-0 lg:before:w-px lg:before:bg-[#c9bdb2]/80 lg:dark:before:bg-[#2a211c]"
                        : ""
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-[#211a16] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6f6259] dark:text-[#9a8980]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded5cb]/80 bg-[#fbf8f4] px-4 py-16 sm:px-6 md:py-20 lg:px-8 dark:border-[#3a2f28] dark:bg-[#17120f]/35">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                  Featured products
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#211a16] md:text-4xl dark:text-white">
                  Fresh marketplace picks
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f6259] dark:text-[#9a8980]">
                  Recently highlighted products from approved marketplace listings.
                </p>
              </div>
              <Link href="/products" className="btn-secondary w-fit">
                View all products
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8">
              {isLoading ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="surface-card p-10 text-center">
                  <p className="font-medium text-[#807168] dark:text-[#9a8980]">
                    No featured products yet. Approve products from the admin dashboard.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f1eb] px-4 py-16 sm:px-6 md:py-20 lg:px-8 dark:bg-[#0f0c0a]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                  Shop your way
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#211a16] md:text-4xl dark:text-white">
                  Explore popular categories
                </h2>
              </div>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#584940] transition hover:text-orange-600 dark:text-[#e2d7ce] dark:hover:text-orange-400"
              >
                All categories <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.slice(0, 5).map((category, index) => {
                const visual = getCategoryVisual(category);

                return (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="group overflow-hidden rounded-[24px] border border-[#d8c9bb] bg-[#fffdfa] shadow-[0_12px_30px_rgba(53,37,27,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-[0_22px_46px_rgba(53,37,27,0.15)] dark:border-[#46372e] dark:bg-[#17120f] dark:shadow-[0_16px_38px_rgba(0,0,0,0.28)] dark:hover:border-orange-500/70 dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.38)]"
                  >
                    <div className="relative h-32 overflow-hidden border-b border-[#eadfd5] bg-[#eee5dc] dark:border-[#342820] dark:bg-[#0f0c0a]">
                      <img
                        src={visual.image}
                        alt={visual.alt}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-95 saturate-[0.92] contrast-[1.04] transition duration-500 group-hover:scale-[1.06] group-hover:opacity-100 dark:opacity-80 dark:saturate-[0.82] dark:brightness-[0.84] dark:contrast-[1.08] dark:group-hover:opacity-95 dark:group-hover:brightness-[0.92]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d16]/20 via-transparent to-white/5 dark:from-black/35 dark:via-transparent dark:to-white/5" />
                      <span className="absolute left-4 top-4 inline-flex min-w-8 items-center justify-center rounded-full border border-white/55 bg-white/85 px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#6b574b] shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/55 dark:text-[#f3e9e1]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex min-h-[164px] flex-col p-5">
                      <p className="text-[1.3rem] font-semibold tracking-[-0.03em] text-[#211a16] dark:text-white">
                        {category}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6f6259] dark:text-[#c6b7ad]">
                        Curated used listings tailored to this category.
                      </p>
                      <p className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-orange-600 dark:text-orange-400">
                        Browse items
                        <ArrowRight size={14} className="transition duration-300 group-hover:translate-x-1" />
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="trusted-sellers" className="bg-[#f4f1eb] px-4 py-16 text-[#211a16] sm:px-6 md:py-20 lg:px-8 dark:bg-[#15110f] dark:text-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                  Trusted community
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  Know who you&apos;re buying from.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-[#6f6259] dark:text-white/60">
                  Verified seller identity is surfaced directly in the marketplace so buyers can shop with more context.
                </p>

                <div className="mt-8 grid grid-cols-3 divide-x divide-[#d8cdbf] border-y border-[#d8cdbf] py-5 dark:divide-white/10 dark:border-white/10">
                  {[
                    { value: stats.totalProducts || 0, label: "Products" },
                    { value: stats.totalSellers || 0, label: "Sellers" },
                    { value: stats.totalBuyers || 0, label: "Buyers" },
                  ].map((item) => (
                    <div key={item.label} className="px-3 first:pl-0 sm:px-5">
                      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-[#807168] dark:text-white/50">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {trustedSellers.length === 0 ? (
                <div className="flex min-h-56 items-center justify-center rounded-2xl border border-dashed border-[#d6c9bc] bg-[#fbf8f4] p-8 text-center shadow-[0_14px_36px_rgba(35,24,18,0.05)] dark:border-white/15 dark:bg-[#fbf8f4]/[0.04] dark:shadow-none">
                  <p className="max-w-md text-sm leading-6 text-[#7b6a60] dark:text-white/55">
                    No verified sellers yet. Admin can verify sellers from user management.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {trustedSellers.map((seller) => (
                    <div
                      key={seller._id}
                      className="flex items-center gap-3 rounded-2xl border border-[#ded5cb] bg-[#fbf8f4] p-4 shadow-[0_10px_28px_rgba(35,24,18,0.05)] transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_16px_36px_rgba(35,24,18,0.08)] dark:border-white/10 dark:bg-[#fbf8f4]/[0.06] dark:shadow-none dark:hover:border-orange-400/40 dark:hover:bg-[#fbf8f4]/[0.09]"
                    >
                      <img
                        src={seller.photo || seller.image || "https://i.pravatar.cc/120"}
                        alt={seller.name}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="line-clamp-1 text-sm font-semibold text-[#211a16] dark:text-white">
                            {seller.name}
                          </p>
                          <BadgeCheck size={14} className="shrink-0 text-orange-400" />
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs text-[#807168] dark:text-white/45">
                          {seller.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f1eb] px-4 py-16 sm:px-6 md:py-20 lg:px-8 dark:bg-[#0f0c0a]">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#ded5cb] bg-[#fbf8f4] shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-[#3a2f28] dark:bg-[#17120f]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="p-7 sm:p-9 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                  Ready to sell?
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#211a16] sm:text-4xl dark:text-white">
                  Give your unused products a second life.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#6f6259] dark:text-[#9a8980]">
                  Create a seller account, publish your listing, and manage products and orders from your dashboard.
                </p>
                <Link href="/register" className="btn-primary mt-7">
                  Start selling
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative min-h-72 overflow-hidden bg-[#eee7df] lg:min-h-[370px] dark:bg-[#2a211c]">
                <img
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=85&w=1400&auto=format&fit=crop"
                  alt="Pre-owned camera ready for resale"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/5" />
                <div className="absolute bottom-5 right-5 rounded-2xl border border-white/30 bg-black/35 px-4 py-3 text-white backdrop-blur-lg">
                  <p className="text-xs text-white/60">Marketplace idea</p>
                  <p className="mt-1 text-sm font-semibold">Reuse. Resell. Repeat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}