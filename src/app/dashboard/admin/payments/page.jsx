"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { getAdminPaymentsApi } from "@/lib/paymentsApi";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-payments", search],
    queryFn: () => getAdminPaymentsApi({ search, limit: 50 }),
  });

  const payments = data?.payments || [];

  return (
    <RoleRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Admin payments</p>
          <h1 className="dashboard-page-heading mt-1">Monitor transactions</h1>
          <p className="dashboard-page-copy">
            Review transaction IDs, products, payment status, amount, and payment dates.
          </p>
        </section>

        <section className="dashboard-card overflow-hidden p-0">
          <div className="dashboard-toolbar md:grid-cols-[minmax(0,1fr)_150px]">
            <div className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8980]" size={17} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search transaction or product"
                className="input-control pl-9"
              />
            </div>
            <div className="dashboard-count">Total: {data?.total || payments.length}</div>
          </div>

          <div className="table-scroll">
            {isLoading ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading payments...</p>
            ) : payments.length === 0 ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">No payments found.</p>
            ) : (
              <table className="dashboard-table min-w-[900px]">
                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment._id}>
                      <td className="font-mono text-xs font-semibold text-[#211a16] dark:text-white">
                        {payment.transactionId}
                      </td>
                      <td>{payment.productSnapshot?.title}</td>
                      <td className="font-semibold text-[#211a16] dark:text-white">
                        ৳{Number(payment.amount).toLocaleString()}
                      </td>
                      <td>
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
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
