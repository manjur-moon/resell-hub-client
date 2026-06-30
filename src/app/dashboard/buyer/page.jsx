"use client";
import StatCard from "@/components/dashboard/StatCard";
import RoleRoute from "@/components/shared/RoleRoute";
import { getBuyerDashboardApi } from "@/lib/statsApi";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, Heart, ShoppingBag } from "lucide-react";
export default function BuyerDashboardPage() { const { data } = useQuery({ queryKey: ["buyer-dashboard"], queryFn: getBuyerDashboardApi }); const stats = data?.stats || {}; return <RoleRoute allowedRoles={["buyer"]}><div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">Buyer Dashboard</p><h1 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">Your marketplace activity</h1></div><div className="grid gap-5 md:grid-cols-3"><StatCard title="Total Orders" value={stats.totalOrders || 0} description="Orders placed by you" icon={ShoppingBag}/><StatCard title="Wishlist Count" value={stats.wishlistCount || 0} description="Products saved for later" icon={Heart}/><StatCard title="Total Paid" value={`৳${Number(stats.totalPaid || 0).toLocaleString()}`} description="Total completed payments" icon={CreditCard}/></div></div></RoleRoute>; }
