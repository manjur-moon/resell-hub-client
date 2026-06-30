import axiosInstance from "./axiosInstance";
export async function createCheckoutSessionApi(orderId) { const { data } = await axiosInstance.post("/api/payments/create-checkout-session", { orderId }); return data; }
export async function confirmPaymentApi(sessionId) { const { data } = await axiosInstance.post("/api/payments/confirm", { sessionId }); return data; }
export async function getMyPaymentsApi() { const { data } = await axiosInstance.get("/api/payments/my-history"); return data; }
export async function getAdminPaymentsApi(params = {}) { const { data } = await axiosInstance.get("/api/payments", { params }); return data; }
