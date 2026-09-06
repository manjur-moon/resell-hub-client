"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { getSellerOrdersApi, updateOrderStatusApi } from "@/lib/ordersApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const orderStatuses = ["pending", "accepted", "processing", "shipped", "delivered", "cancelled", "rejected"];

export default function SellerManageOrdersPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["seller-orders"],
    queryFn: getSellerOrdersApi,
  });

  const orders = data?.orders || [];

  const updateMutation = useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: data => {
      toast.success(data.message || "Order updated.");
      queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["seller"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Manage orders</p>
          <h1 className="dashboard-page-heading mt-1">Orders for your products</h1>
          <p className="dashboard-page-copy">Review buyer details and update the fulfillment status for each order.</p>
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
              <table className="dashboard-table min-w-[900px]">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Buyer</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Order status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td className="font-semibold text-[#211a16] dark:text-white">{order.productTitle}</td>
                      <td>
                        <p className="font-medium text-[#2d241f] dark:text-[#f4ece5]">{order.buyerInfo?.name}</p>
                        <p className="mt-0.5 text-xs text-[#807168] dark:text-[#9a8980]">{order.buyerInfo?.email}</p>
                      </td>
                      <td className="capitalize">{order.paymentStatus}</td>
                      <td className="font-semibold text-[#211a16] dark:text-white">৳{Number(order.totalAmount).toLocaleString()}</td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={event => updateMutation.mutate({ id: order._id, orderStatus: event.target.value })}
                          className="input-control min-w-36 py-2 capitalize"
                        >
                          {orderStatuses.map(status => <option key={status} value={status}>{status}</option>)}
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
