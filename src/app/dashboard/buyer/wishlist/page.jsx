"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { getMyWishlistApi, removeFromWishlistApi } from "@/lib/wishlistApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function BuyerWishlistPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["my-wishlist"],
    queryFn: getMyWishlistApi,
  });

  const wishlist = data?.wishlist || [];

  const removeMutation = useMutation({
    mutationFn: removeFromWishlistApi,
    onSuccess: data => {
      toast.success(data.message || "Removed from wishlist.");
      queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["buyer"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Wishlist</p>
          <h1 className="dashboard-page-heading mt-1">Saved products</h1>
          <p className="dashboard-page-copy">Products you marked to review again later.</p>
        </section>

        {isLoading ? (
          <div className="dashboard-card text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading wishlist...</div>
        ) : wishlist.length === 0 ? (
          <div className="dashboard-card py-12 text-center">
            <p className="text-base font-semibold text-[#211a16] dark:text-white">Your wishlist is empty</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#807168] dark:text-[#9a8980]">
              Browse the marketplace and save products you want to revisit.
            </p>
            <Link href="/products" className="btn-primary mt-5">Browse Products</Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {wishlist.map(item => (
              <article key={item._id} className="dashboard-card overflow-hidden p-0">
                <div className="aspect-[16/10] overflow-hidden bg-[#eee7df] dark:bg-[#2a211c]">
                  <img
                    src={item.productSnapshot?.image}
                    alt={item.productSnapshot?.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-semibold text-[#211a16] dark:text-white">{item.productSnapshot?.title}</h2>
                  <p className="mt-2 text-xl font-semibold text-orange-600 dark:text-orange-400">
                    ৳{Number(item.productSnapshot?.price).toLocaleString()}
                  </p>
                  <div className="mt-5 flex items-center gap-2 border-t border-[#eee7df] pt-4 dark:border-[#3a2f28]">
                    <Link href={`/products/${item.productId}`} className="btn-primary flex-1">
                      View product <ArrowUpRight size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeMutation.mutate(item.productId)}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#c9bdb2] bg-[#fbf8f4] text-red-600 transition hover:border-red-300 hover:bg-red-50 dark:border-[#57483f] dark:bg-[#17120f] dark:hover:bg-red-500/10"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </RoleRoute>
  );
}
