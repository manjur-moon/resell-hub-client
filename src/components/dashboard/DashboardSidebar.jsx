"use client";

import { useAuth } from "@/providers/AuthProvider";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  CreditCard,
  Flag,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  PackageSearch,
  ReceiptText,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Store,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const menus = {
  buyer: [
    {
      label: "Workspace",
      items: [
        ["Overview", "/dashboard/buyer", LayoutDashboard],
        ["My Orders", "/dashboard/buyer/orders", ShoppingBag],
        ["Wishlist", "/dashboard/buyer/wishlist", Heart],
        ["Payments", "/dashboard/buyer/payments", CreditCard],
      ],
    },
    { label: "Account", items: [["Profile", "/dashboard/profile", Settings]] },
  ],
  seller: [
    {
      label: "Store",
      items: [
        ["Overview", "/dashboard/seller", LayoutDashboard],
        ["Add Product", "/dashboard/seller/add-product", PackagePlus],
        ["My Products", "/dashboard/seller/my-products", PackageSearch],
        ["Manage Orders", "/dashboard/seller/manage-orders", ReceiptText],
      ],
    },
    {
      label: "Insights",
      items: [["Analytics", "/dashboard/seller/analytics", BarChart3]],
    },
    { label: "Account", items: [["Profile", "/dashboard/profile", Settings]] },
  ],
  admin: [
    {
      label: "Platform",
      items: [
        ["Overview", "/dashboard/admin", ShieldCheck],
        ["Manage Users", "/dashboard/admin/users", Users],
        ["Manage Products", "/dashboard/admin/products", PackageSearch],
        ["Manage Orders", "/dashboard/admin/orders", ReceiptText],
        ["Payments", "/dashboard/admin/payments", CreditCard],
      ],
    },
    {
      label: "Intelligence",
      items: [
        ["Reports", "/dashboard/admin/reports", Flag],
        ["Analytics", "/dashboard/admin/analytics", BarChart3],
      ],
    },
    { label: "Account", items: [["Profile", "/dashboard/profile", Settings]] },
  ],
};

export default function DashboardSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const role = user?.role || "buyer";
  const groups = menus[role] || menus.buyer;

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      toast.success("Logged out successfully.");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Logout failed.");
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close dashboard navigation"
        className={`fixed inset-0 z-40 bg-[#0a0706]/65 backdrop-blur-sm transition lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-dvh w-72 border-r border-white/[0.07] bg-[#100c0a] text-white shadow-[16px_0_50px_rgba(8,5,4,0.18)] transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-full flex-col overflow-hidden">
          <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-24 h-64 w-64 rounded-full bg-[#795946]/10 blur-3xl" />

          <div className="relative flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5">
            <Link href="/" className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-[0_10px_24px_rgba(249,115,22,0.24)]">
                <BadgeCheck size={21} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-white">
                  ReSell Hub
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-white/35">
                  Marketplace OS
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white/50 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
              aria-label="Close dashboard menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative mx-4 mt-4 rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <img
                src={user?.photo || user?.image || "https://i.pravatar.cc/120?img=12"}
                alt={user?.name || "User"}
                className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.name || "User"}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <p className="text-[11px] font-medium capitalize tracking-wide text-white/45">
                    {role} workspace
                  </p>
                </div>
              </div>
            </div>
          </div>

          <nav className="relative flex-1 overflow-y-auto px-3 pb-4 pt-5">
            <Link
              href="/"
              onClick={onClose}
              className="mb-5 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 text-sm font-medium text-white/55 transition hover:border-orange-500/20 hover:bg-orange-500/[0.07] hover:text-orange-200"
            >
              <span className="flex items-center gap-3">
                <Home size={17} />
                Back to marketplace
              </span>
              <ArrowUpRight size={15} />
            </Link>

            <div className="space-y-5">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map(([label, href, Icon]) => {
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={onClose}
                          aria-current={isActive ? "page" : undefined}
                          className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                            isActive
                              ? "bg-orange-500 text-white shadow-[0_8px_22px_rgba(249,115,22,0.18)]"
                              : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                          }`}
                        >
                          <Icon size={17} />
                          <span>{label}</span>
                          {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="relative border-t border-white/[0.07] p-3">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-white/50 transition hover:bg-red-500/10 hover:text-red-200"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
