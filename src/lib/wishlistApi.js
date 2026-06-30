import axiosInstance from "./axiosInstance";
export async function addToWishlistApi(productId) { const { data } = await axiosInstance.post(`/api/wishlist/${productId}`); return data; }
export async function getMyWishlistApi() { const { data } = await axiosInstance.get("/api/wishlist/my-wishlist"); return data; }
export async function removeFromWishlistApi(productId) { const { data } = await axiosInstance.delete(`/api/wishlist/${productId}`); return data; }
