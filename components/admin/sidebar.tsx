"use client";

import { useState } from "react";
import { Sidebar as SidebarComponent } from "@/components/sidebar";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardPen,
  Settings,
  ChartPie,
  Users,
  ClipboardClock,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header: Visible only on small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <span className="font-black text-red-600 tracking-tighter text-lg uppercase">
            Admin
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-slate-900 text-sm">{app_title}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Overlay: Darkens content when sidebar is active */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Internal Sidebar Component */}
          <SidebarComponent 
            title={app_title} 
            items={items} 
            onItemClick={() => setIsOpen(false)} 
          />
          
          {/* Admin Tag for Sidebar Footer or Header area if supported by SidebarComponent */}
          <div className="mt-auto p-4 border-t border-slate-100 hidden lg:block">
            <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-center">
              Administrator Access
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}