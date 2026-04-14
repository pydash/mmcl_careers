"use client";

import { useState } from "react";
import { Sidebar as SidebarComponent } from "@/components/sidebar";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardPen,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const app_title = "MMCL Careers";
  const items = [
    { title: "Dashboard", href: "/applicant/dashboard", icon: LayoutDashboard },
    { title: "Browse Jobs", href: "/applicant/jobs", icon: BriefcaseBusiness },
    {
      title: "My Applications",
      href: "/applicant/applications",
      icon: ClipboardPen,
    },
    { title: "Profile", href: "/applicant/profile", icon: User },
    { title: "Settings", href: "/applicant/settings", icon: Settings },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header: Visible only on small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-40">
        <span className="font-bold text-red-600 ">{app_title}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-slate-600"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Overlay: Darkens background when sidebar is open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container: 
          - Hidden by default on mobile, translated off-screen
          - Visible and fixed on desktop (lg:block)
          - Animated transition for sliding in on mobile
      */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarComponent
          title={app_title}
          items={items}
          // Optional: Pass a callback to close sidebar when a link is clicked on mobile
        />
      </aside>
    </>
  );
}
