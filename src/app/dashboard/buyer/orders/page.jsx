"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { getMyOrdersApi } from "@/lib/ordersApi";
import { useQuery } from "@tanstack/react-query";

function StatusBadge({ status }) {
  const style =
    status === "delivered"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : status === "cancelled" || status === "rejected"
        ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
        : "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${style}`}>{status}</span>;
}

export default function BuyerOrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrdersApi,
  });

  const orders = data?.orders || [];

  return (
    <RoleRoute allowedRoles={["buyer"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">My orders</p>
          <h1 className="dashboard-page-heading mt-1">Your purchase history</h1>
          <p className="dashboard-page-copy">Review products you purchased and follow their payment and order status.</p>
        </section>

        <section className="dashboard-card overflow-hidden p-0">
          <div className="border-b border-[#ded5cb] bg-[#f4f1eb]/70 px-4 py-3 dark:border-[#3a2f28] dark:bg-[#0f0c0a]/50">
            <p className="text-sm font-medium text-[#6f6259] dark:text-[#c9bbb1]">Total orders: {orders.length}</p>
          </div>
          <div className="table-scroll">
            {isLoading ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">No orders found.</p>
            ) : (
              <table className="dashboard-table min-w-[850px]">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Seller</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Order</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={order.productImage}
                            alt={order.productTitle}
                            className="h-12 w-12 rounded-md object-cover ring-1 ring-[#ded5cb] dark:ring-[#57483f]"
                          />
                          <p className="font-semibold text-[#211a16] dark:text-white">{order.productTitle}</p>
                        </div>
                      </td>
                      <td>{order.sellerInfo?.name}</td>
                      <td className="font-semibold text-[#211a16] dark:text-white">৳{Number(order.totalAmount).toLocaleString()}</td>
                      <td className="capitalize">{order.paymentStatus}</td>
                      <td><StatusBadge status={order.orderStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </RoleRoute>
  );
}
