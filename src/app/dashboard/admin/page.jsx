"use client";

import SimpleLineChart from "@/components/charts/SimpleLineChart";
import DashboardActionCard from "@/components/dashboard/DashboardActionCard";
import StatCard from "@/components/dashboard/StatCard";
import RoleRoute from "@/components/shared/RoleRoute";
import { getAdminDashboardApi } from "@/lib/statsApi";
import { useQuery } from "@tanstack/react-query";
import {
  PackageSearch,
  ReceiptText,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardApi,
  });

  const stats = data?.stats || {};
  const chartData = data?.charts?.userGrowth || [];

  return (
    <RoleRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <div className="max-w-3xl">
            <p className="eyebrow">Admin dashboard</p>
            <h1 className="dashboard-page-heading mt-2">Platform control center</h1>
            <p className="dashboard-page-copy">
              Review marketplace growth, moderation, orders, users and revenue from one focused operating workspace.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Marketplace oversight</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Moderation controls</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Revenue visibility</span>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Users" value={stats.totalUsers || 0} description="Registered accounts" icon={Users} />
          <StatCard title="Total Products" value={stats.totalProducts || 0} description="Marketplace listings" icon={PackageSearch} />
          <StatCard title="Total Orders" value={stats.totalOrders || 0} description="All marketplace orders" icon={ReceiptText} />
          <StatCard
            title="Total Revenue"
            value={`৳${Number(stats.totalRevenue || 0).toLocaleString()}`}
            description="Revenue from paid payments"
            icon={Wallet}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="dashboard-card overflow-hidden p-0">
            <div className="border-b border-[#e7ddd3] px-5 py-5 dark:border-white/[0.07] sm:px-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">Growth signal</p>
              <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">User growth</h2>
              <p className="mt-1 text-sm text-[#807168] dark:text-white/42">A quick view of recent platform user growth.</p>
            </div>
            <div className="p-4 sm:p-6">
              <SimpleLineChart data={chartData} />
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">Operations</p>
                <h2 className="mt-1 text-lg font-semibold text-[#211a16] dark:text-white">Review what needs attention</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <DashboardActionCard href="/dashboard/admin/users" icon={Users} title="Manage users" text="Review accounts, roles, access status and seller verification." />
              <DashboardActionCard href="/dashboard/admin/products" icon={PackageSearch} title="Moderate listings" text="Approve, reject or remove marketplace product listings." />
              <DashboardActionCard href="/dashboard/admin/orders" icon={ShieldCheck} title="Review orders" text="Monitor order activity and marketplace fulfillment." />
            </div>
          </section>
        </div>
      </div>
    </RoleRoute>
  );
}
