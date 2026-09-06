"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { getAllUsersApi, updateUserStatusApi, verifySellerApi } from "@/lib/authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BadgeCheck, Ban, CheckCircle, Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", search, role],
    queryFn: () => getAllUsersApi({ search, role, limit: 50 }),
  });

  const users = data?.users || [];
  const invalidateUsers = () => queryClient.invalidateQueries({ queryKey: ["admin-users"] });

  const statusMutation = useMutation({
    mutationFn: updateUserStatusApi,
    onSuccess: data => {
      toast.success(data.message || "User status updated.");
      invalidateUsers();
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  const verifyMutation = useMutation({
    mutationFn: verifySellerApi,
    onSuccess: data => {
      toast.success(data.message || "Seller verification updated.");
      invalidateUsers();
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Manage users</p>
          <h1 className="dashboard-page-heading mt-1">Monitor users and sellers</h1>
          <p className="dashboard-page-copy">
            Search accounts, filter by role, manage access status, and control seller verification.
          </p>
        </section>

        <section className="dashboard-card overflow-hidden p-0">
          <div className="dashboard-toolbar md:grid-cols-[minmax(0,1fr)_220px_150px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8980]" size={17} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name or email"
                className="input-control pl-9"
              />
            </div>
            <select value={role} onChange={e => setRole(e.target.value)} className="input-control">
              <option value="">All roles</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
            <div className="dashboard-count">Total: {data?.total || 0}</div>
          </div>

          <div className="table-scroll">
            {isLoading ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="p-6 text-sm font-medium text-[#807168] dark:text-[#9a8980]">No users found.</p>
            ) : (
              <table className="dashboard-table min-w-[950px]">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Seller verified</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(item => (
                    <tr key={item._id || item.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.photo || item.image || "https://i.pravatar.cc/120"}
                            alt={item.name}
                            className="h-10 w-10 rounded-md object-cover ring-1 ring-[#ded5cb] dark:ring-[#57483f]"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-[#211a16] dark:text-white">{item.name}</p>
                            <p className="mt-0.5 text-xs text-[#807168] dark:text-[#9a8980]">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="capitalize">{item.role}</td>
                      <td>
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                            item.status === "active"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.isVerifiedSeller ? "Verified" : "Not verified"}</td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {item.role === "seller" && (
                            <button
                              type="button"
                              onClick={() =>
                                verifyMutation.mutate({
                                  id: item._id || item.id,
                                  isVerifiedSeller: !item.isVerifiedSeller,
                                })
                              }
                              className="dashboard-icon-button"
                              title={item.isVerifiedSeller ? "Remove verification" : "Verify seller"}
                            >
                              <BadgeCheck size={17} />
                            </button>
                          )}

                          {item.status === "active" ? (
                            <button
                              type="button"
                              onClick={() =>
                                statusMutation.mutate({ id: item._id || item.id, status: "blocked" })
                              }
                              className="dashboard-icon-button hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                              title="Block user"
                            >
                              <Ban size={17} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                statusMutation.mutate({ id: item._id || item.id, status: "active" })
                              }
                              className="dashboard-icon-button"
                              title="Activate user"
                            >
                              <CheckCircle size={17} />
                            </button>
                          )}
                        </div>
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
