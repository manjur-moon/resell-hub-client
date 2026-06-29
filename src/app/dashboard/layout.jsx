"use client";
import DashboardShell from "@/components/dashboard/DashboardShell"; import ProtectedRoute from "@/components/shared/ProtectedRoute"; export default function DashboardLayout({children}){return <ProtectedRoute><DashboardShell>{children}</DashboardShell></ProtectedRoute>}
