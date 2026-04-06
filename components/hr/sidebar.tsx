"use client";

import { useState } from "react";
import { Sidebar as SidebarComponent } from "@/components/sidebar";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardPen,
  ChartPie,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header: Visible only on small screens to provide access to the menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-40">
        <span className="font-black text-red-600 tracking-tight">
          {app_title}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-slate-600"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Backdrop: Closes sidebar when clicking outside on mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar: 
          - Slides in from left on mobile (-translate-x-full to 0)
          - Static and always visible on desktop (lg:translate-x-0)
      */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarComponent
          title={app_title}
          items={items}
          // Closes the menu automatically when a navigation item is selected on mobile
          onItemClick={() => setIsOpen(false)}
        />
      </aside>
    </>
  );
}
