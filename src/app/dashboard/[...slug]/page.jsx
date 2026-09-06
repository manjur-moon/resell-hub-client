"use client";

import ComingSoonPanel from "@/components/dashboard/ComingSoonPanel";
import RoleRoute from "@/components/shared/RoleRoute";
import { useParams } from "next/navigation";

function title(slug = []) {
  return slug
    .map(part => part.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "))
    .join(" / ");
}

export default function DashboardPlaceholderPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug : [];
  const role = slug[0];
  const allowed = ["buyer", "seller", "admin"].includes(role) ? [role] : ["buyer", "seller", "admin"];

  return (
    <RoleRoute allowedRoles={allowed}>
      <ComingSoonPanel
        title={title(slug)}
        description="This dashboard route is ready. Its feature UI and API integration can be added without changing the dashboard design system."
        phase="a later feature phase"
      />
    </RoleRoute>
  );
}
