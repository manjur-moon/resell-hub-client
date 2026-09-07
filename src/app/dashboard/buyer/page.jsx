"use client";

import DashboardActionCard from "@/components/dashboard/DashboardActionCard";
import StatCard from "@/components/dashboard/StatCard";
import RoleRoute from "@/components/shared/RoleRoute";
import { getBuyerDashboardApi } from "@/lib/statsApi";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, Heart, ShoppingBag } from "lucide-react";

export default function BuyerDashboardPage() {
  const { data } = useQuery({
    queryKey: ["buyer-dashboard"],
    queryFn: getBuyerDashboardApi,
  });

  const stats = data?.stats || {};

  return (
    <RoleRoute allowedRoles={["buyer"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <div className="max-w-3xl">
            <p className="eyebrow">Buyer dashboard</p>
            <h1 className="dashboard-page-heading mt-2">Your marketplace activity</h1>
            <p className="dashboard-page-copy">
              Keep orders, saved products and completed payments organized in a buyer workspace designed around your next action.
            </p>
          </div>
          <div className="dashboard-hero-tags">
            <span className="dashboard-hero-tag">Order tracking</span>
            <span className="dashboard-hero-tag">Saved products</span>
            <span className="dashboard-hero-tag">Payment history</span>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total Orders" value={stats.totalOrders || 0} description="Orders placed by you" icon={ShoppingBag} />
          <StatCard title="Wishlist Count" value={stats.wishlistCount || 0} description="Products saved for later" icon={Heart} />
          <StatCard
            title="Total Paid"
            value={`৳${Number(stats.totalPaid || 0).toLocaleString()}`}
            description="Completed marketplace payments"
            icon={CreditCard}
          />
        </div>

        <section>
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">Continue shopping</p>
            <h2 className="mt-1 text-lg font-semibold text-[#211a16] dark:text-white">Quick actions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <DashboardActionCard href="/products" icon={ShoppingBag} title="Browse products" text="Explore approved marketplace listings and fresh deals." />
            <DashboardActionCard href="/dashboard/buyer/wishlist" icon={Heart} title="Open wishlist" text="Review products you saved and return to them quickly." />
            <DashboardActionCard href="/dashboard/buyer/orders" icon={CreditCard} title="View orders" text="Check payment state and delivery progress in one place." />
          </div>
        </section>
      </div>
    </RoleRoute>
  );
}