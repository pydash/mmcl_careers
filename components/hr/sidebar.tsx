"use client";

import { Sidebar as SidebarComponent } from "@/components/sidebar";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardPen,
  Settings,
  ChartPie,
  User,
} from "lucide-react";

export default function Sidebar() {
  const app_title = "MMCL Careers";
  const items = [
    { title: "Dashboard", href: "/hr/dashboard", icon: LayoutDashboard },
    { title: "Manage Jobs", href: "/hr/jobs", icon: BriefcaseBusiness },
    {
      title: "Manage Applicants",
      href: "/hr/applicants",
      icon: ClipboardPen,
    },
    { title: "Profile", href: "/hr/profile", icon: User },
    { title: "Analytics", href: "/hr/analytics", icon: ChartPie },
    { title: "Settings", href: "/hr/settings", icon: Settings },
  ];
  return <SidebarComponent title={app_title} items={items} />;
}
