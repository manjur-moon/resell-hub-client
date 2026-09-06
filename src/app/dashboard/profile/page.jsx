"use client";

import RoleRoute from "@/components/shared/RoleRoute";
import { becomeSellerApi, updateProfileApi } from "@/lib/authApi";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { Mail, MapPin, Phone, Save, Store, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const { register, handleSubmit } = useForm({
    values: {
      name: user?.name || "",
      phone: user?.phone || "",
      location: user?.location || "",
      photo: user?.photo || user?.image || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: async data => {
      toast.success(data.message || "Profile updated.");
      await refreshUser();
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  const becomeSellerMutation = useMutation({
    mutationFn: becomeSellerApi,
    onSuccess: async data => {
      toast.success(data.message || "You are now a seller.");
      await refreshUser();
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  const handleBecomeSeller = () => {
    if (!user?.phone || !user?.location) {
      return toast.error("Please add phone and location before becoming a seller.");
    }
    becomeSellerMutation.mutate({ phone: user.phone, location: user.location });
  };

  return (
    <RoleRoute allowedRoles={["buyer", "seller", "admin"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Profile settings</p>
          <h1 className="dashboard-page-heading mt-1">Manage your account</h1>
          <p className="dashboard-page-copy">Keep your personal marketplace information accurate and up to date.</p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="dashboard-card h-fit overflow-hidden p-0">
            <div className="border-b border-white/[0.07] bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_38%),linear-gradient(135deg,#17110e,#0f0b09)] p-5 text-white">
              <div className="flex items-center gap-4">
                <img
                  src={user?.photo || user?.image || "https://i.pravatar.cc/160?img=12"}
                  alt={user?.name || "User"}
                  className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/15"
                />
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-semibold text-white">{user?.name}</h2>
                  <span className="mt-2 inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold capitalize text-orange-200">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-5 text-sm">
              <InfoRow icon={Mail} label="Email" value={user?.email || "Not provided"} />
              <InfoRow icon={Phone} label="Phone" value={user?.phone || "Not provided"} />
              <InfoRow icon={MapPin} label="Location" value={user?.location || "Not provided"} />
            </div>

            {user?.role === "buyer" && (
              <div className="border-t border-[#ded5cb] p-5 dark:border-[#3a2f28]">
                <p className="text-sm leading-6 text-[#807168] dark:text-[#9a8980]">
                  Add your phone and location first, then switch your account to seller mode.
                </p>
                <button
                  type="button"
                  onClick={handleBecomeSeller}
                  disabled={becomeSellerMutation.isPending}
                  className="btn-primary mt-4 w-full"
                >
                  <Store size={18} />
                  {becomeSellerMutation.isPending ? "Updating..." : "Become Seller"}
                </button>
              </div>
            )}
          </aside>

          <form onSubmit={handleSubmit(data => updateMutation.mutate(data))} className="dashboard-card overflow-hidden p-0">
            <div className="border-b border-[#e7ddd3] bg-[linear-gradient(180deg,#fffaf5_0%,#f8f2ec_100%)] px-5 py-5 dark:border-white/[0.07] dark:bg-[linear-gradient(180deg,#18120f_0%,#120e0c_100%)] sm:px-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">Account details</p>
              <h2 className="mt-1.5 text-lg font-semibold text-[#211a16] dark:text-white">Personal information</h2>
              <p className="mt-1 text-sm text-[#807168] dark:text-[#9a8980]">
                These details are used across your account and marketplace activity.
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
              <Field label="Name" icon={UserRound}>
                <input placeholder="Name" className="input-control" {...register("name", { required: true })} />
              </Field>
              <Field label="Phone" icon={Phone}>
                <input placeholder="Phone" className="input-control" {...register("phone")} />
              </Field>
              <Field label="Location" icon={MapPin}>
                <input placeholder="Location" className="input-control" {...register("location")} />
              </Field>
              <Field label="Photo URL" icon={UserRound}>
                <input placeholder="https://..." className="input-control" {...register("photo")} />
              </Field>
            </div>

            <div className="flex justify-end border-t border-[#e7ddd3] bg-[#f7f1ea] px-5 py-4 dark:border-white/[0.07] dark:bg-[#100c0a] sm:px-6">
              <button type="submit" disabled={updateMutation.isPending} className="btn-primary">
                <Save size={18} />
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </RoleRoute>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#eee7df] text-[#807168] dark:bg-[#2a211c] dark:text-[#c9bbb1]">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#807168] dark:text-[#9a8980]">{label}</p>
        <p className="mt-0.5 break-words font-medium text-[#2d241f] dark:text-[#f4ece5]">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#584940] dark:text-[#e2d7ce]">
        <Icon size={15} className="text-[#9a8980]" />
        {label}
      </label>
      {children}
    </div>
  );
}
