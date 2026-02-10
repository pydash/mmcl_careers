"use client";

import { Sidebar as SidebarComponent } from "@/components/sidebar";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardPen,
  Settings,
  ChartPie,
  Users,
  ClipboardClock,
} from "lucide-react";

export default function Sidebar() {
  const app_title = "MMCL Careers";
  const items = [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Manage Jobs", href: "/admin/jobs", icon: BriefcaseBusiness },
    {
      title: "Manage Applicants",
      href: "/admin/applicants",
      icon: ClipboardPen,
    },
    { title: "Analytics", href: "/admin/analytics", icon: ChartPie },
    { title: "Accounts", href: "/admin/accounts", icon: Users },
    { title: "Logs", href: "/admin/logs", icon: ClipboardClock },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ];
  return <SidebarComponent title={app_title} items={items} />;
}
