"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import RoleRoute from "@/components/shared/RoleRoute";
import {
  adminDeleteProductApi,
  approveProductApi,
  getAdminProductsApi,
  rejectProductApi,
} from "@/lib/productsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Search, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    available: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    rejected: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
    sold: "bg-[#eee7df] text-[#584940] dark:bg-[#2a211c] dark:text-[#c9bbb1]",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [rejectProduct, setRejectProduct] = useState(null);
  const [reason, setReason] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-products", search, status],
    queryFn: () => getAdminProductsApi({ search, status, limit: 50 }),
  });

  const products = data?.products || [];
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-products"] });

  const approve = useMutation({
    mutationFn: approveProductApi,
    onSuccess: data => {
      toast.success(data.message || "Product approved.");
      invalidate();
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  const reject = useMutation({
    mutationFn: rejectProductApi,
    onSuccess: data => {
      toast.success(data.message || "Product rejected.");
      setRejectProduct(null);
      setReason("");
      invalidate();
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  const remove = useMutation({
    mutationFn: adminDeleteProductApi,
    onSuccess: data => {
      toast.success(data.message || "Product deleted.");
      setDeleteId(null);
      invalidate();
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Manage products</p>
          <h1 className="dashboard-page-heading mt-1">Review marketplace listings</h1>
          <p className="dashboard-page-copy">
            Search listings, review approval status, and moderate products without changing listing data.
          </p>
        </section>

        <section className="dashboard-card overflow-hidden p-0">
          <div className="dashboard-toolbar md:grid-cols-[minmax(0,1fr)_220px_150px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8980]" size={17} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products"
                className="input-control pl-9"
              />
            </div>
            <select value={status} onChange={e => setStatus(e.target.value)} className="input-control">
              <option value="">All status</option>
              <option value="pending">Pending</option>
              <option value="available">Available</option>
              <option value="rejected">Rejected</option>
              <option value="sold">Sold</option>
            </select>
            <div className="dashboard-count">Total: {data?.total || 0}</div>
          </div>

          {isLoading && <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading products...</p>}
          {isError && <p className="p-6 text-sm font-medium text-red-600">Failed to load products.</p>}
          {!isLoading && !isError && products.length === 0 && (
            <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">No products found.</p>
          )}

          {products.length > 0 && (
            <div className="table-scroll">
              <table className="dashboard-table min-w-[1000px]">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Seller</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0]}
                            alt={product.title}
                            className="h-12 w-12 rounded-md object-cover ring-1 ring-[#ded5cb] dark:ring-[#57483f]"
                          />
                          <div>
                            <p className="font-semibold text-[#211a16] dark:text-white">{product.title}</p>
                            <p className="mt-0.5 text-xs text-[#807168] dark:text-[#9a8980]">{product.condition}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="font-medium text-[#2d241f] dark:text-[#f4ece5]">{product.sellerInfo?.name}</p>
                        <p className="mt-0.5 text-xs text-[#807168] dark:text-[#9a8980]">{product.sellerInfo?.email}</p>
                      </td>
                      <td>{product.category}</td>
                      <td className="font-semibold text-[#211a16] dark:text-white">৳{Number(product.price).toLocaleString()}</td>
                      <td><StatusBadge status={product.status} /></td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => approve.mutate(product._id)}
                            disabled={product.status === "available"}
                            className="dashboard-icon-button"
                            title="Approve product"
                          >
                            <Check size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setRejectProduct(product)}
                            className="dashboard-icon-button"
                            title="Reject product"
                          >
                            <X size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteId(product._id)}
                            className="dashboard-icon-button hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                            title="Delete product"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <ConfirmModal
          isOpen={Boolean(deleteId)}
          title="Delete product?"
          message="This product will be permanently removed."
          confirmText="Delete"
          loading={remove.isPending}
          onClose={() => setDeleteId(null)}
          onConfirm={() => remove.mutate(deleteId)}
        />

        {rejectProduct && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0f0c0a]/55 px-4 backdrop-blur-[1px]">
            <div className="w-full max-w-md rounded-lg border border-[#ded5cb] bg-[#fbf8f4] p-6 shadow-2xl dark:border-[#3a2f28] dark:bg-[#17120f]">
              <div className="mb-5 h-1 w-10 rounded-full bg-orange-500" />
              <p className="eyebrow">Reject product</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#211a16] dark:text-white">
                {rejectProduct.title}
              </h2>
              <label className="mt-5 block text-sm font-medium text-[#584940] dark:text-[#e2d7ce]">
                Rejection reason
              </label>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                rows={4}
                placeholder="Explain why this listing is being rejected"
                className="input-control mt-2 resize-none"
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRejectProduct(null);
                    setReason("");
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!reason.trim()) return toast.error("Rejection reason is required.");
                    reject.mutate({ id: rejectProduct._id, rejectionReason: reason });
                  }}
                  className="btn-primary"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleRoute>
  );
}
