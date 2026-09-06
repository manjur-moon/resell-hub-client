"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { getMyPaymentsApi } from "@/lib/paymentsApi";
import { useQuery } from "@tanstack/react-query";

export default function BuyerPaymentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPaymentsApi,
  });

  const payments = data?.payments || [];

  return (
    <RoleRoute allowedRoles={["buyer"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Payment history</p>
          <h1 className="dashboard-page-heading mt-1">Your transactions</h1>
          <p className="dashboard-page-copy">A clean record of your completed marketplace payments.</p>
        </section>

        <section className="dashboard-card overflow-hidden p-0">
          <div className="border-b border-[#ded5cb] bg-[#f4f1eb]/70 px-4 py-3 dark:border-[#3a2f28] dark:bg-[#0f0c0a]/50">
            <p className="text-sm font-medium text-[#6f6259] dark:text-[#c9bbb1]">Total payments: {payments.length}</p>
          </div>
          <div className="table-scroll">
            {isLoading ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading payments...</p>
            ) : payments.length === 0 ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">No payments found.</p>
            ) : (
              <table className="dashboard-table min-w-[850px]">
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
                      <td className="font-mono text-xs font-semibold text-[#211a16] dark:text-white">{payment.transactionId}</td>
                      <td>{payment.productSnapshot?.title}</td>
                      <td className="font-semibold text-[#211a16] dark:text-white">৳{Number(payment.amount).toLocaleString()}</td>
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
