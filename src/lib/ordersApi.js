import axiosInstance from "./axiosInstance";
export async function createOrderApi(payload) { const { data } = await axiosInstance.post("/api/orders", payload); return data; }
export async function getMyOrdersApi() { const { data } = await axiosInstance.get("/api/orders/my-orders"); return data; }
export async function getSellerOrdersApi(params = {}) { const { data } = await axiosInstance.get("/api/orders/seller", { params }); return data; }
export async function getAdminOrdersApi(params = {}) { const { data } = await axiosInstance.get("/api/orders", { params }); return data; }
export async function updateOrderStatusApi({ id, orderStatus }) { const { data } = await axiosInstance.patch(`/api/orders/${id}/status`, { orderStatus }); return data; }
export async function cancelOrderApi(id) { const { data } = await axiosInstance.patch(`/api/orders/${id}/cancel`); return data; }
