"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import RoleRoute from "@/components/shared/RoleRoute";
import { createOrderApi } from "@/lib/ordersApi";
import { createCheckoutSessionApi } from "@/lib/paymentsApi";
import { getProductByIdApi } from "@/lib/productsApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CreditCard,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const checkoutSteps = [
  { number: "01", label: "Delivery", active: true },
  { number: "02", label: "Review", active: true },
  { number: "03", label: "Secure payment", active: false },
];

export default function CheckoutPage() {
  const params = useParams();
  const productId = params.productId;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      fullName: "",
      phone: "",
      address: "",
      city: "",
      notes: "",
    },
  });

  const quantity = Number(watch("quantity") || 1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["checkout-product", productId],
    queryFn: () => getProductByIdApi(productId),
    enabled: Boolean(productId),
  });

  const product = data?.product;
  const totalAmount = product ? Number(product.price) * quantity : 0;

  const checkoutMutation = useMutation({
    mutationFn: async (formData) => {
      const orderResponse = await createOrderApi({
        productId,
        quantity: Number(formData.quantity),
        deliveryInfo: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          notes: formData.notes,
        },
      });

      return createCheckoutSessionApi(orderResponse.orderId);
    },
    onSuccess: (response) => {
      if (response?.url) window.location.href = response.url;
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message),
  });

  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["buyer"]}>
        <main className="min-h-screen bg-[#f4f1eb] dark:bg-[#0f0c0a]">
          <section className="relative overflow-hidden border-b border-[#2a1d16] bg-[#15110f] px-4 pb-12 pt-8 text-white sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-[#6b3a20]/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
              <Link
                href={productId ? `/products/${productId}` : "/products"}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-orange-300"
              >
                <ArrowLeft size={16} />
                Back to product
              </Link>

              <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                    <ShoppingBag size={14} />
                    Buyer checkout
                  </div>

                  <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                    Complete your purchase with confidence.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
                    Add your delivery details, review the order, then continue to Stripe for secure payment.
                  </p>
                </div>

                <div className="grid min-w-0 grid-cols-3 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] backdrop-blur-md sm:min-w-[430px]">
                  {checkoutSteps.map((step) => (
                    <div
                      key={step.number}
                      className="border-r border-white/10 px-4 py-4 last:border-r-0"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ${
                            step.active
                              ? "bg-orange-500 text-white"
                              : "border border-white/15 bg-white/5 text-white/50"
                          }`}
                        >
                          {step.active ? <Check size={13} /> : step.number}
                        </span>
                        <span className="hidden text-xs font-semibold text-white/75 sm:block">
                          {step.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {isLoading && (
                <div className="mx-auto flex min-h-52 max-w-2xl items-center justify-center rounded-[28px] border border-[#ddd2c6] bg-[#fbf8f4] p-8 text-center shadow-[0_18px_50px_rgba(35,24,18,0.06)] dark:border-[#2f241d] dark:bg-[#17120f]">
                  <div>
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#ded5cb] border-t-orange-500 dark:border-[#57483f] dark:border-t-orange-400" />
                    <p className="mt-4 text-sm font-semibold text-[#6f6259] dark:text-[#c9bbb1]">
                      Preparing your checkout...
                    </p>
                  </div>
                </div>
              )}

              {isError && (
                <div className="mx-auto max-w-2xl rounded-[28px] border border-red-200 bg-[#fbf8f4] p-8 text-center shadow-[0_18px_50px_rgba(35,24,18,0.06)] dark:border-red-900/60 dark:bg-[#17120f]">
                  <p className="text-lg font-semibold text-[#211a16] dark:text-white">
                    Product could not be loaded
                  </p>
                  <p className="mt-2 text-sm text-[#807168] dark:text-[#9a8980]">
                    Refresh the page or return to products and try again.
                  </p>
                  <Link href="/products" className="btn-secondary mt-5">
                    Browse products
                  </Link>
                </div>
              )}

              {product && (
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
                  <form
                    onSubmit={handleSubmit((formData) => checkoutMutation.mutate(formData))}
                    className="overflow-hidden rounded-[28px] border border-[#ddd2c6] bg-[#fbf8f4] shadow-[0_18px_50px_rgba(35,24,18,0.07)] dark:border-[#2f241d] dark:bg-[#17120f]"
                  >
                    <div className="flex flex-col gap-4 border-b border-[#e5dbd0] px-5 py-5 dark:border-[#2a211c] sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                          Delivery details
                        </p>
                        <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.025em] text-[#211a16] dark:text-white">
                          Where should we send it?
                        </h2>
                      </div>
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e1d6cb] bg-[#f6efe7] px-3 py-1.5 text-xs font-semibold text-[#6b5b51] dark:border-[#352a23] dark:bg-[#130e0c] dark:text-[#c9bbb1]">
                        <Truck size={14} className="text-orange-500" />
                        Delivery information
                      </div>
                    </div>

                    <div className="p-5 sm:p-7">
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Full name" error={errors.fullName}>
                          <input
                            placeholder="Your full name"
                            className="input-control"
                            {...register("fullName", { required: true })}
                          />
                        </Field>

                        <Field label="Phone number" error={errors.phone}>
                          <input
                            placeholder="Your phone number"
                            className="input-control"
                            {...register("phone", { required: true })}
                          />
                        </Field>

                        <Field label="City" error={errors.city}>
                          <input
                            placeholder="Delivery city"
                            className="input-control"
                            {...register("city", { required: true })}
                          />
                        </Field>

                        <Field label="Quantity" error={errors.quantity}>
                          <input
                            type="number"
                            min="1"
                            max={product.stockQuantity}
                            className="input-control"
                            {...register("quantity", {
                              required: true,
                              min: 1,
                              max: product.stockQuantity,
                            })}
                          />
                          <p className="mt-2 text-xs text-[#807168] dark:text-[#9a8980]">
                            {product.stockQuantity} item
                            {Number(product.stockQuantity) === 1 ? "" : "s"} available
                          </p>
                        </Field>
                      </div>

                      <div className="mt-5">
                        <Field label="Delivery address" error={errors.address}>
                          <textarea
                            rows={4}
                            placeholder="Street, area, building or delivery instructions"
                            className="input-control resize-y"
                            {...register("address", { required: true })}
                          />
                        </Field>
                      </div>

                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-[#584940] dark:text-[#e2d7ce]">
                          Notes
                          <span className="ml-1 font-normal text-[#9a8980]">(optional)</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Add any optional note for the seller"
                          className="input-control resize-y"
                          {...register("notes")}
                        />
                      </div>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        <TrustNote
                          icon={ShieldCheck}
                          title="Protected checkout"
                          text="Your order is created before Stripe handles the payment step."
                        />
                        <TrustNote
                          icon={LockKeyhole}
                          title="Secure payment"
                          text="Payment details are completed securely through Stripe."
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-[#e5dbd0] bg-[#f5eee7] px-5 py-5 dark:border-[#2a211c] dark:bg-[#130e0c] sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <p className="max-w-md text-xs leading-5 text-[#7b6b61] dark:text-[#9a8980]">
                        By continuing, you&apos;ll create the order and be redirected to Stripe to complete payment.
                      </p>
                      <button
                        type="submit"
                        disabled={checkoutMutation.isPending}
                        className="btn-primary w-full shrink-0 justify-center sm:w-auto"
                      >
                        <CreditCard size={17} />
                        {checkoutMutation.isPending ? "Redirecting..." : "Continue to Stripe"}
                      </button>
                    </div>
                  </form>

                  <aside className="overflow-hidden rounded-[28px] border border-[#ddd2c6] bg-[#fbf8f4] shadow-[0_18px_50px_rgba(35,24,18,0.08)] dark:border-[#2f241d] dark:bg-[#17120f] xl:sticky xl:top-24">
                    <div className="h-1 bg-orange-500" />
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                            Order summary
                          </p>
                          <h2 className="mt-1 text-xl font-semibold text-[#211a16] dark:text-white">
                            Review before payment
                          </h2>
                        </div>
                        {product.sellerInfo?.isVerifiedSeller && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1.5 text-[11px] font-semibold text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                            <BadgeCheck size={13} />
                            Verified
                          </span>
                        )}
                      </div>

                      <div className="mt-5 overflow-hidden rounded-[22px] border border-[#ddd2c6] bg-[#eee7df] dark:border-[#342922] dark:bg-[#130e0c]">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="aspect-[16/10] w-full object-cover"
                          />
                        ) : (
                          <div className="flex aspect-[16/10] items-center justify-center text-sm text-[#807168] dark:text-[#9a8980]">
                            No product image
                          </div>
                        )}
                      </div>

                      <h3 className="mt-4 text-xl font-semibold leading-7 tracking-[-0.02em] text-[#211a16] dark:text-white">
                        {product.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-[#807168] dark:text-[#9a8980]">
                        <MapPin size={15} className="text-orange-500" />
                        <span>{product.location}</span>
                      </div>

                      <dl className="mt-5 divide-y divide-[#e3d8cc] rounded-[20px] border border-[#ddd2c6] bg-[#f7f1ea] px-4 dark:divide-[#30261f] dark:border-[#342922] dark:bg-[#130e0c]">
                        <SummaryRow
                          label="Unit price"
                          value={`৳${Number(product.price).toLocaleString()}`}
                        />
                        <SummaryRow label="Quantity" value={quantity} />
                        <div className="flex items-end justify-between gap-4 py-4">
                          <dt>
                            <p className="font-semibold text-[#211a16] dark:text-white">Total</p>
                            <p className="mt-0.5 text-xs text-[#8a786d] dark:text-[#9a8980]">
                              Final order amount
                            </p>
                          </dt>
                          <dd className="text-2xl font-semibold tracking-[-0.03em] text-orange-600 dark:text-orange-400">
                            ৳{Number(totalAmount).toLocaleString()}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-5 rounded-[20px] border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                        <div className="flex items-start gap-3">
                          <PackageCheck
                            size={19}
                            className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          />
                          <div>
                            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                              Secure Stripe payment
                            </p>
                            <p className="mt-1 text-xs leading-5 text-emerald-800/80 dark:text-emerald-300/75">
                              You&apos;ll leave ResellHub briefly to complete the payment securely on Stripe.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              )}
            </div>
          </section>
        </main>
      </RoleRoute>
    </ProtectedRoute>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#584940] dark:text-[#e2d7ce]">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-red-600 dark:text-red-400">
          This field is required or contains an invalid value.
        </span>
      )}
    </label>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
      <dt className="text-[#807168] dark:text-[#9a8980]">{label}</dt>
      <dd className="font-semibold text-[#43372f] dark:text-[#e2d7ce]">{value}</dd>
    </div>
  );
}

function TrustNote({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[20px] border border-[#e4d9ce] bg-[#f8f2eb] p-4 dark:border-[#30261f] dark:bg-[#130e0c]">
      <Icon size={18} className="text-orange-500" />
      <p className="mt-3 text-sm font-semibold text-[#211a16] dark:text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#7b6b61] dark:text-[#9a8980]">{text}</p>
    </div>
  );
}
