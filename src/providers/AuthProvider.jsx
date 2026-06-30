"use client";

import { getCurrentUserApi, logoutUser } from "@/lib/authApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, refetch } = useQuery({ queryKey: ["current-user"], queryFn: getCurrentUserApi, retry: false });
  const user = data?.user || null;
  const refreshUser = async () => { await refetch(); };
  const logout = async () => { await logoutUser(); queryClient.removeQueries({ queryKey: ["current-user"] }); await refetch(); };
  return <AuthContext.Provider value={{ user, loading: isLoading || isFetching, refreshUser, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
