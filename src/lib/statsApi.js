import axiosInstance from "./axiosInstance";
export async function getMarketplaceStatsApi() { const { data } = await axiosInstance.get("/api/stats/marketplace"); return data; }
export async function getTrustedSellersApi() { const { data } = await axiosInstance.get("/api/stats/trusted-sellers"); return data; }
export async function getBuyerDashboardApi() { const { data } = await axiosInstance.get("/api/dashboard/buyer"); return data; }
export async function getSellerDashboardApi() { const { data } = await axiosInstance.get("/api/dashboard/seller"); return data; }
export async function getAdminDashboardApi() { const { data } = await axiosInstance.get("/api/dashboard/admin"); return data; }
