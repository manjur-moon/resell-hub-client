"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import RoleRoute from "@/components/shared/RoleRoute";
import { deleteMyProductApi, getMyProductsApi } from "@/lib/productsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    available: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    rejected: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
    sold: "bg-[#eee7df] text-[#584940] dark:bg-[#2a211c] dark:text-[#c9bbb1]",
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] || styles.pending}`}>{status}</span>;
}

export default function MyProductsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-products", search, status],
    queryFn: () => getMyProductsApi({ search, status, limit: 50 }),
  });

  const products = data?.products || [];

  const remove = useMutation({
    mutationFn: deleteMyProductApi,
    onSuccess: data => {
      toast.success(data.message || "Product deleted successfully.");
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["seller"]}>
      <div className="space-y-6">
        <section className="dashboard-hero flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">My products</p>
            <h1 className="dashboard-page-heading mt-1">Manage your listings</h1>
            <p className="dashboard-page-copy">Search, review, edit, or remove the products you created.</p>
          </div>
          <Link href="/dashboard/seller/add-product" className="btn-primary shrink-0">
            <Plus size={17} /> Add Product
          </Link>
        </section>

        <section className="dashboard-card overflow-hidden p-0">
          <div className="dashboard-toolbar md:grid-cols-[minmax(0,1fr)_220px_150px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8980]" size={17} />
              <input
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search products"
                className="input-control pl-9"
              />
            </div>
            <select value={status} onChange={event => setStatus(event.target.value)} className="input-control">
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
          {!isLoading && !isError && products.length === 0 && <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">No products found.</p>}

          {products.length > 0 && (
            <div className="table-scroll">
              <table className="dashboard-table min-w-[850px]">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
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
                      <td>{product.category}</td>
                      <td className="font-semibold text-[#211a16] dark:text-white">৳{Number(product.price).toLocaleString()}</td>
                      <td>{product.stockQuantity}</td>
                      <td><StatusBadge status={product.status} /></td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <Link href={`/products/${product._id}`} className="dashboard-icon-button" title="View product">
                            <Eye size={17} />
                          </Link>
                          <Link href={`/dashboard/seller/edit-product/${product._id}`} className="dashboard-icon-button" title="Edit product">
                            <Edit size={17} />
                          </Link>
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
          message="This product will be permanently deleted."
          confirmText="Delete"
          loading={remove.isPending}
          onClose={() => setDeleteId(null)}
          onConfirm={() => remove.mutate(deleteId)}
        />
      </div>
    </RoleRoute>
  );
}
