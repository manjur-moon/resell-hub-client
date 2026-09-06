"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { getAdminOrdersApi, updateOrderStatusApi } from "@/lib/ordersApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const orderStatuses = ["pending", "accepted", "processing", "shipped", "delivered", "cancelled", "rejected"];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders", search],
    queryFn: () => getAdminOrdersApi({ search, limit: 50 }),
  });

  const orders = data?.orders || [];

  const updateMutation = useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: data => {
      toast.success(data.message || "Order updated.");
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Admin orders</p>
          <h1 className="dashboard-page-heading mt-1">Monitor marketplace orders</h1>
          <p className="dashboard-page-copy">
            Search buyer, seller, or product information and keep order progress up to date.
          </p>
        </section>

        <section className="dashboard-card overflow-hidden p-0">
          <div className="dashboard-toolbar md:grid-cols-[minmax(0,1fr)_150px]">
            <div className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8980]" size={17} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search product, buyer, seller"
                className="input-control pl-9"
              />
            </div>
            <div className="dashboard-count">Total: {data?.total || orders.length}</div>
          </div>

          <div className="table-scroll">
            {isLoading ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">No orders found.</p>
            ) : (
              <table className="dashboard-table min-w-[1000px]">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Buyer</th>
                    <th>Seller</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td className="font-semibold text-[#211a16] dark:text-white">{order.productTitle}</td>
                      <td>{order.buyerInfo?.email}</td>
                      <td>{order.sellerInfo?.email}</td>
                      <td className="capitalize">{order.paymentStatus}</td>
                      <td className="font-semibold text-[#211a16] dark:text-white">
                        ৳{Number(order.totalAmount).toLocaleString()}
                      </td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={event =>
                            updateMutation.mutate({ id: order._id, orderStatus: event.target.value })
                          }
                          className="input-control min-w-36 py-2 capitalize"
                        >
                          {orderStatuses.map(status => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
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
