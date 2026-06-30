import { authClient } from "./auth-client";
import axiosInstance from "./axiosInstance";

export async function registerWithEmail({ name, email, password, image }) {
  const { data, error } = await authClient.signUp.email({ name, email, password, image, callbackURL: "/dashboard" });
  if (error) throw new Error(error.message || "Registration failed.");
  return data;
}

export async function loginWithEmail({ email, password }) {
  const { data, error } = await authClient.signIn.email({ email, password, callbackURL: "/dashboard", rememberMe: true });
  if (error) throw new Error(error.message || "Login failed.");
  return data;
}

export async function loginWithGoogle() {
  const { error } = await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard", errorCallbackURL: "/login" });
  if (error) throw new Error(error.message || "Google login failed.");
  return true;
}

export async function logoutUser() {
  const { error } = await authClient.signOut();
  if (error) throw new Error(error.message || "Logout failed.");
  return true;
}

export async function getCurrentUserApi() { const { data } = await axiosInstance.get("/api/auth/me"); return data; }
export async function updateProfileApi(payload) { const { data } = await axiosInstance.patch("/api/users/profile", payload); return data; }
export async function becomeSellerApi(payload) { const { data } = await axiosInstance.patch("/api/users/become-seller", payload); return data; }
export async function getAllUsersApi(params = {}) { const { data } = await axiosInstance.get("/api/users", { params }); return data; }
export async function updateUserStatusApi({ id, status }) { const { data } = await axiosInstance.patch(`/api/users/${id}/status`, { status }); return data; }
export async function verifySellerApi({ id, isVerifiedSeller }) { const { data } = await axiosInstance.patch(`/api/users/${id}/verify-seller`, { isVerifiedSeller }); return data; }
