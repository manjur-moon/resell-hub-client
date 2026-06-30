"use client";

import { addToWishlistApi } from "@/lib/wishlistApi";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BadgeCheck, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const wishlistMutation = useMutation({ mutationFn: addToWishlistApi, onSuccess: data => toast.success(data.message || "Added to wishlist."), onError: error => toast.error(error?.response?.data?.message || "Please login as buyer.") });
  const handleWishlist = () => { if (!user) return toast.error("Please login first."); if (user.role !== "buyer") return toast.error("Only buyers can add wishlist items."); wishlistMutation.mutate(product._id); };
  return <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800"><img src={product.images?.[0] || "https://images.unsplash.com/photo-1553531889-56cc480ac5cb?q=80&w=1200&auto=format&fit=crop"} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><button onClick={handleWishlist} className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:scale-110 dark:bg-slate-950" aria-label="Add to wishlist"><Heart size={20}/></button><div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 backdrop-blur dark:bg-slate-950/80 dark:text-white">{product.condition}</div>{product.sellerInfo?.isVerifiedSeller && <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-black text-white"><BadgeCheck size={14}/>Verified</div>}</div>
    <div className="flex flex-1 flex-col p-5"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">{product.category}</span><span className="text-lg font-black text-orange-600">৳{Number(product.price).toLocaleString()}</span></div><h3 className="line-clamp-2 text-xl font-black text-slate-950 dark:text-white">{product.title}</h3><p className="mt-3 line-clamp-2 flex-1 text-sm text-slate-600 dark:text-slate-300">{product.description}</p><div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400"><MapPin size={16}/><span className="line-clamp-1">{product.location}</span></div><div className="mt-5 flex items-center justify-between gap-3"><div><p className="text-xs text-slate-500 dark:text-slate-400">Seller</p><p className="line-clamp-1 text-sm font-bold text-slate-800 dark:text-slate-100">{product.sellerInfo?.name || "Unknown Seller"}</p></div><Link href={`/products/${product._id}`} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 dark:bg-white dark:text-slate-950 dark:hover:bg-orange-500 dark:hover:text-white">View Details</Link></div></div>
  </motion.article>;
}
