"use client";

import ProductForm from "@/components/products/ProductForm";
import RoleRoute from "@/components/shared/RoleRoute";
import { getProductByIdApi, updateProductApi } from "@/lib/productsApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdApi(id),
    enabled: Boolean(id),
  });

  const mutation = useMutation({
    mutationFn: updateProductApi,
    onSuccess: data => {
      toast.success(data.message || "Product updated successfully.");
      router.push("/dashboard/seller/my-products");
    },
    onError: error => toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <RoleRoute allowedRoles={["seller"]}>
      <div className="space-y-6">
        <section className="dashboard-hero">
          <p className="eyebrow">Edit product</p>
          <h1 className="dashboard-page-heading mt-1">Update your listing</h1>
          <p className="dashboard-page-copy">Edit product details while keeping the existing listing workflow unchanged.</p>
        </section>

        {isLoading && <div className="dashboard-card text-sm font-medium text-[#807168] dark:text-[#9a8980]">Loading product...</div>}
        {isError && <div className="dashboard-card text-sm font-medium text-red-600">Failed to load product.</div>}
        {data?.product && (
          <ProductForm
            initialData={data.product}
            onSubmit={payload => mutation.mutate({ id, payload })}
            loading={mutation.isPending}
            submitText="Update Product"
          />
        )}
      </div>
    </RoleRoute>
  );
}
