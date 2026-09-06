"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { getProductByIdApi } from "@/lib/productsApi";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id;
  const { user } = useAuth();
  const [activeImage, setActiveImage] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdApi(id),
    enabled: Boolean(id),
  });

  const product = data?.product;

  useEffect(() => {
    if (product?.images?.[0]) {
      setActiveImage(product.images[0]);
    }
  }, [product?._id]);

  if (isLoading) {
    return (
      <PublicLayout>
        <main className="min-h-screen bg-[#f4f1eb]/70 px-4 py-20 text-center dark:bg-[#0f0c0a]">
          <div className="mx-auto max-w-md rounded-[24px] border border-[#ded5cb] bg-[#fbf8f4] p-8 shadow-[0_18px_50px_rgba(35,24,18,0.06)] dark:border-[#3a2f28] dark:bg-[#17120f]">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#ded5cb] border-t-orange-500 dark:border-[#57483f] dark:border-t-orange-400" />
            <p className="mt-4 text-sm font-semibold text-[#6f6259] dark:text-[#c9bbb1]">
              Loading product details...
            </p>
          </div>
        </main>
      </PublicLayout>
    );
  }

  if (isError || !product) {
    return (
      <PublicLayout>
        <main className="min-h-screen bg-[#f4f1eb]/70 px-4 py-20 text-center dark:bg-[#0f0c0a]">
          <div className="mx-auto max-w-md rounded-[24px] border border-red-200 bg-[#fbf8f4] p-8 shadow-[0_18px_50px_rgba(35,24,18,0.06)] dark:border-red-900/60 dark:bg-[#17120f]">
            <p className="font-semibold text-red-600 dark:text-red-400">
              Product could not be loaded.
            </p>
            <Link href="/products" className="btn-secondary mt-5">
              Back to products
            </Link>
          </div>
        </main>
      </PublicLayout>
    );
  }

  const isOwnProduct =
    user && String(product.sellerInfo?.userId) === String(user._id || user.id);

  const galleryImages = product.images?.filter(Boolean) || [];
  const heroImage = activeImage || galleryImages[0];

  const details = [
    ["Condition", product.condition],
    ["Stock", product.stockQuantity],
    ["Location", product.location],
    ["Status", product.status],
  ];

  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#f4f1eb]/70 dark:bg-[#0f0c0a]">
        <section className="border-b border-[#2a1d16] bg-[#15110f] px-4 pb-10 pt-8 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <nav className="flex flex-wrap items-center gap-1 text-sm text-white/55">
              <Link href="/" className="transition hover:text-orange-300">
                Home
              </Link>
              <ChevronRight size={15} />
              <Link href="/products" className="transition hover:text-orange-300">
                Products
              </Link>
              <ChevronRight size={15} />
              <span className="max-w-60 truncate font-medium text-white/85">
                {product.title}
              </span>
            </nav>

            <div className="mt-7 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                  {product.category}
                </p>
                <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                  {product.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
                  {product.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-white/85 backdrop-blur">
                    <PackageCheck size={16} className="text-orange-400" />
                    {product.condition}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-white/85 backdrop-blur">
                    <MapPin size={16} className="text-orange-400" />
                    {product.location}
                  </span>
                  {product.sellerInfo?.isVerifiedSeller && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-2 text-orange-200">
                      <BadgeCheck size={16} />
                      Verified seller
                    </span>
                  )}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                      Listing overview
                    </p>
                    <p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-orange-400">
                      ৳{Number(product.price).toLocaleString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium capitalize text-emerald-200">
                    {product.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/72">
                  <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Stock</p>
                    <p className="mt-1 font-semibold text-white">{product.stockQuantity}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Category</p>
                    <p className="mt-1 font-semibold text-white">{product.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
              <section className="space-y-6">
                <div className="overflow-hidden rounded-[28px] border border-[#ddd2c6] bg-[#fbf8f4] shadow-[0_18px_50px_rgba(35,24,18,0.06)] dark:border-[#2f241d] dark:bg-[#17120f]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#f9f2ea_0%,#eee5da_100%)] dark:bg-[linear-gradient(135deg,#15110f_0%,#0f0c0a_100%)]">
                    {heroImage ? (
                      <img
                        src={heroImage}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#807168] dark:text-[#9a8980]">
                        No image available
                      </div>
                    )}
                  </div>

                  {galleryImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-3 border-t border-[#e8dfd5] p-4 dark:border-[#2a211c] sm:grid-cols-5 lg:grid-cols-6">
                      {galleryImages.map((image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => setActiveImage(image)}
                          className={`overflow-hidden rounded-2xl border transition ${
                            heroImage === image
                              ? "border-orange-500 ring-2 ring-orange-500/20"
                              : "border-[#ded5cb] hover:border-orange-300 dark:border-[#3a2f28] dark:hover:border-orange-500/45"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            className="aspect-square w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-[28px] border border-[#ddd2c6] bg-[#fbf8f4] p-6 shadow-[0_18px_50px_rgba(35,24,18,0.06)] dark:border-[#2f241d] dark:bg-[#17120f] sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                    Product details
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-[#ded5cb] bg-[#e7ddd2] dark:border-[#332922] dark:bg-[#2a211c] sm:grid-cols-2">
                    {details.map(([label, value]) => (
                      <div key={label} className="bg-[#f9f4ee] p-4 dark:bg-[#130e0c]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b786d] dark:text-[#9a8980]">
                          {label}
                        </p>
                        <p className="mt-1.5 font-semibold capitalize text-[#211a16] dark:text-white">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-[#e8dfd5] pt-6 dark:border-[#2a211c]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                      Description
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-[#6f6259] dark:text-[#c9bbb1]">
                      {product.description}
                    </p>
                  </div>
                </div>
              </section>

              <aside className="xl:sticky xl:top-24">
                <div className="overflow-hidden rounded-[28px] border border-[#ddd2c6] bg-[#fbf8f4] shadow-[0_18px_50px_rgba(35,24,18,0.07)] dark:border-[#2f241d] dark:bg-[#17120f]">
                  <div className="h-1 bg-orange-500" />
                  <div className="p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                      Purchase summary
                    </p>
                    <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#211a16] dark:text-white">
                      ৳{Number(product.price).toLocaleString()}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#6f6259] dark:text-[#c9bbb1]">
                      Review the listing details, confirm the seller information and proceed to checkout securely.
                    </p>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 rounded-2xl border border-[#e6ddd3] bg-[#f8f3ed] px-4 py-3 dark:border-[#2b221d] dark:bg-[#130e0c]">
                        <ShieldCheck size={18} className="text-orange-500" />
                        <div>
                          <p className="text-sm font-semibold text-[#211a16] dark:text-white">Trust-first listing</p>
                          <p className="text-xs text-[#7c6e64] dark:text-[#9a8980]">Condition, seller and location are visible before purchase.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl border border-[#e6ddd3] bg-[#f8f3ed] px-4 py-3 dark:border-[#2b221d] dark:bg-[#130e0c]">
                        <PackageCheck size={18} className="text-orange-500" />
                        <div>
                          <p className="text-sm font-semibold text-[#211a16] dark:text-white">Ready for checkout</p>
                          <p className="text-xs text-[#7c6e64] dark:text-[#9a8980]">Use the secure checkout flow to complete your order.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-[#ded5cb] bg-[#f9f4ee] p-5 dark:border-[#342922] dark:bg-[#130e0c]">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#6f6259] dark:text-[#9a8980]">
                        <UserRound size={17} />
                        Seller information
                      </div>

                      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="font-semibold text-[#211a16] dark:text-white">
                            {product.sellerInfo?.name}
                          </p>
                          <p className="mt-1 truncate text-sm text-[#807168] dark:text-[#9a8980]">
                            {product.sellerInfo?.email}
                          </p>
                        </div>

                        {product.sellerInfo?.isVerifiedSeller && (
                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                            <BadgeCheck size={15} />
                            Verified seller
                          </span>
                        )}
                      </div>
                    </div>

                    {product.location && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-[#807168] dark:text-[#9a8980]">
                        <MapPin size={16} className="text-orange-500" />
                        Listed in {product.location}
                      </div>
                    )}

                    {product.status === "available" && !isOwnProduct && (
                      <Link href={`/checkout/${product._id}`} className="btn-primary mt-6 w-full justify-center">
                        <ShoppingCart size={18} />
                        Buy now
                      </Link>
                    )}

                    {isOwnProduct && (
                      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-200">
                        <PackageCheck size={18} className="mt-0.5 shrink-0" />
                        <p className="font-medium">
                          This is your own listing, so checkout is disabled for this product.
                        </p>
                      </div>
                    )}

                    <Link href="/products" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#5d4e46] transition hover:text-orange-600 dark:text-[#d3c5bb] dark:hover:text-orange-400">
                      Continue browsing
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
