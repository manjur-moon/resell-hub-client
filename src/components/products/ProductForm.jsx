"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ProductImageUploader from "./ProductImageUploader";

const categories = [
  "Electronics",
  "Mobile Phones",
  "Furniture",
  "Vehicles",
  "Fashion",
  "Home Appliances",
  "Books",
  "Sports",
  "Gaming",
  "Others",
];

const conditions = ["Used", "Like New", "Refurbished"];

export default function ProductForm({ initialData = null, onSubmit, submitText = "Save Product", loading = false }) {
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      condition: "Used",
      price: "",
      stockQuantity: 1,
      description: "",
      location: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        category: initialData.category || "",
        condition: initialData.condition || "Used",
        price: initialData.price || "",
        stockQuantity: initialData.stockQuantity ?? 1,
        description: initialData.description || "",
        location: initialData.location || "",
      });
      setImages(Array.isArray(initialData.images) ? initialData.images : []);
    }
  }, [initialData, reset]);

  const submit = form => {
    if (!images.length) return toast.error("Please upload at least one product image.");

    onSubmit({
      title: form.title.trim(),
      category: form.category,
      condition: form.condition,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      images,
      description: form.description.trim(),
      location: form.location.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="dashboard-card overflow-hidden p-0">
      <div className="border-b border-[#e7ddd3] bg-[linear-gradient(180deg,#fffaf5_0%,#f8f2ec_100%)] px-5 py-5 dark:border-white/[0.07] dark:bg-[linear-gradient(180deg,#18120f_0%,#120e0c_100%)] sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">Listing editor</p>
        <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">Listing information</h2>
        <p className="mt-1 text-sm leading-6 text-[#807168] dark:text-white/42">
          Add clear product details and images so buyers can understand the listing quickly.
        </p>
      </div>

      <div className="space-y-7 p-5 sm:p-6">
        <ProductImageUploader images={images} onChange={setImages} maxImages={4} />

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Product title" error={errors.title?.message}>
            <input
              className="input-control"
              placeholder="Used Dell Inspiron 15 Laptop"
              {...register("title", {
                required: "Product title is required.",
                minLength: { value: 3, message: "Title must be at least 3 characters." },
              })}
            />
          </Field>

          <Field label="Category" error={errors.category?.message}>
            <select className="input-control" {...register("category", { required: "Category is required." })}>
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </Field>

          <Field label="Condition">
            <select className="input-control" {...register("condition", { required: "Condition is required." })}>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </Field>

          <Field label="Price" error={errors.price?.message}>
            <input
              type="number"
              className="input-control"
              placeholder="0"
              {...register("price", {
                required: "Price is required.",
                min: { value: 1, message: "Price must be greater than 0." },
              })}
            />
          </Field>

          <Field label="Stock quantity" error={errors.stockQuantity?.message}>
            <input
              type="number"
              className="input-control"
              {...register("stockQuantity", {
                required: "Stock quantity is required.",
                min: { value: 0, message: "Stock quantity cannot be negative." },
              })}
            />
          </Field>

          <Field label="Location" error={errors.location?.message}>
            <input
              className="input-control"
              placeholder="Dhaka, Bangladesh"
              {...register("location", { required: "Location is required." })}
            />
          </Field>
        </div>

        <Field label="Description" error={errors.description?.message}>
          <textarea
            rows={5}
            className="input-control resize-y"
            placeholder="Describe the product condition, important details, and anything a buyer should know."
            {...register("description", {
              required: "Description is required.",
              minLength: { value: 10, message: "Description must be at least 10 characters." },
            })}
          />
        </Field>
      </div>

      <div className="flex justify-end border-t border-[#e7ddd3] bg-[#f7f1ea] px-5 py-4 dark:border-white/[0.07] dark:bg-[#100c0a] sm:px-6">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-[#584940] dark:text-[#e2d7ce]">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
