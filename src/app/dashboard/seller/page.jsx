"use client";

import SimpleLineChart from "@/components/charts/SimpleLineChart";
import DashboardActionCard from "@/components/dashboard/DashboardActionCard";
import StatCard from "@/components/dashboard/StatCard";
import RoleRoute from "@/components/shared/RoleRoute";
import { getSellerDashboardApi } from "@/lib/statsApi";
import { useQuery } from "@tanstack/react-query";
import {
  Clock,
  PackagePlus,
  PackageSearch,
  ReceiptText,
  Wallet,
} from "lucide-react";

export default function SellerDashboardPage() {
  const { data } = useQuery({
    queryKey: ["seller-dashboard"],
    queryFn: getSellerDashboardApi,
  });

  const stats = data?.stats || {};
  const chartData = data?.charts?.monthlySales || [];

  return (
    <RoleRoute allowedRoles={["seller"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <div className="max-w-3xl">
            <p className="eyebrow">Seller dashboard</p>
            <h1 className="dashboard-page-heading mt-2">Run your resale storefront</h1>
            <p className="dashboard-page-copy">
              Track listings, paid sales, revenue and pending orders while keeping the next seller action close at hand.
            </p>
          </div>
          <div className="dashboard-hero-tags">
            <span className="dashboard-hero-tag">Listing management</span>
            <span className="dashboard-hero-tag">Order fulfillment</span>
            <span className="dashboard-hero-tag">Sales visibility</span>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Products" value={stats.totalProducts || 0} description="Products listed by you" icon={PackageSearch} />
          <StatCard title="Total Sales" value={stats.totalSales || 0} description="Paid marketplace orders" icon={ReceiptText} />
          <StatCard
            title="Total Revenue"
            value={`৳${Number(stats.totalRevenue || 0).toLocaleString()}`}
            description="Revenue from paid orders"
            icon={Wallet}
          />
          <StatCard title="Pending Orders" value={stats.pendingOrders || 0} description="Orders waiting for action" icon={Clock} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="dashboard-card overflow-hidden p-0">
            <div className="border-b border-[#e7ddd3] px-5 py-5 dark:border-white/[0.07] sm:px-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">Sales signal</p>
              <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">Monthly sales preview</h2>
              <p className="mt-1 text-sm text-[#807168] dark:text-white/42">A clean view of sales performance from your marketplace orders.</p>
            </div>
            <div className="p-4 sm:p-6">
              <SimpleLineChart data={chartData} />
            </div>
          </section>

          <section>
            <div className="mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">Seller actions</p>
              <h2 className="mt-1 text-lg font-semibold text-[#211a16] dark:text-white">Keep your store moving</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <DashboardActionCard href="/dashboard/seller/add-product" icon={PackagePlus} title="Create a listing" text="Add a product with condition, price, images and location." />
              <DashboardActionCard href="/dashboard/seller/my-products" icon={PackageSearch} title="Manage listings" text="Review approval state, edit details or remove products." />
              <DashboardActionCard href="/dashboard/seller/manage-orders" icon={ReceiptText} title="Fulfill orders" text="Review buyer orders and update delivery progress." />
            </div>
          </section>
        </div>
      </div>
    </RoleRoute>
  );
}