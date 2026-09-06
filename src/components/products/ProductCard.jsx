"use client";

import { addToWishlistApi } from "@/lib/wishlistApi";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, BadgeCheck, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { user } = useAuth();

  const wishlistMutation = useMutation({
    mutationFn: addToWishlistApi,
    onSuccess: (data) => toast.success(data.message || "Added to wishlist."),
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Please login as buyer."),
  });

  const handleWishlist = () => {
    if (!user) return toast.error("Please login first.");
    if (user.role !== "buyer")
      return toast.error("Only buyers can add wishlist items.");
    wishlistMutation.mutate(product._id);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#ddd2c6] bg-[#fbf8f4] shadow-[0_12px_34px_rgba(36,24,17,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#cbbbac] hover:shadow-[0_24px_52px_rgba(36,24,17,0.13)] dark:border-[#332820] dark:bg-[#17120f] dark:hover:border-[#58483e] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e0d8] dark:bg-[#241b17]">
        <img
          src={
            product.images?.[0] ||
            "https://images.unsplash.com/photo-1553531889-56cc480ac5cb?q=80&w=1200&auto=format&fit=crop"
          }
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0c0a]/35 via-transparent to-transparent opacity-80" />

        <button
          type="button"
          onClick={handleWishlist}
          disabled={wishlistMutation.isPending}
          className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/55 bg-[#fbf8f4]/88 text-[#4f4138] shadow-[0_8px_20px_rgba(20,14,10,0.15)] backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/12 dark:bg-[#17120f]/78 dark:text-white/80 dark:hover:bg-[#211a16] dark:hover:text-orange-400"
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </button>

        <div className="absolute bottom-3.5 left-3.5 rounded-full border border-white/10 bg-[#0f0c0a]/78 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-md">
          {product.condition}
        </div>

        {product.sellerInfo?.isVerifiedSeller && (
          <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
            <BadgeCheck size={13} />
            Verified
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-600 dark:text-orange-400">
              {product.category}
            </p>
            <h3 className="mt-2 line-clamp-2 text-[18px] font-semibold leading-6 tracking-[-0.025em] text-[#211a16] dark:text-white">
              {product.title}
            </h3>
          </div>
          <p className="shrink-0 text-lg font-semibold tracking-[-0.03em] text-[#211a16] dark:text-white">
            ৳{Number(product.price).toLocaleString()}
          </p>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-[#75675d] dark:text-[#a8968b]">
          {product.description}
        </p>

        <div className="mt-5 flex items-center gap-2 border-y border-[#e8dfd7] py-3 text-sm text-[#807168] dark:border-[#342922] dark:text-[#a8968b]">
          <MapPin size={15} className="shrink-0 text-orange-500" />
          <span className="line-clamp-1">{product.location}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#a08f84]">
              Seller
            </p>
            <p className="mt-1 line-clamp-1 text-sm font-medium text-[#51443c] dark:text-[#e2d7ce]">
              {product.sellerInfo?.name || "Unknown Seller"}
            </p>
          </div>

          <Link
            href={`/products/${product._id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#17120f] px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 dark:bg-[#f5f0e9] dark:text-[#211a16] dark:hover:bg-orange-500 dark:hover:text-white"
          >
            Details
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
