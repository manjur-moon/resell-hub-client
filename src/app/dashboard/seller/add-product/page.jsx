"use client";

import ProductForm from "@/components/products/ProductForm";
import RoleRoute from "@/components/shared/RoleRoute";
import { createProductApi } from "@/lib/productsApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createProductApi,
    onSuccess: data => {
      toast.success(data.message || "Product created successfully.");
      router.push("/dashboard/seller/my-products");
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["seller"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Add product</p>
          <h1 className="dashboard-page-heading mt-1">Create a new listing</h1>
          <p className="dashboard-page-copy">
            Your product will be submitted for admin approval before it appears publicly.
          </p>
        </section>

        <ProductForm onSubmit={mutate} loading={isPending} submitText="Create Product" />
      </div>
    </RoleRoute>
  );
}
