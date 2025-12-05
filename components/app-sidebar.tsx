"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardPen,
  User,
  Bell,
  Settings,
} from "lucide-react";

import LogoBlock from "../public/logo_block.png";
import { Separator } from "./ui/separator";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NotificationSheet } from "@/components/notification-sheet";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const data = {
    header: {
      title: "Careers",
      icon: LogoBlock,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Browse Jobs",
        url: "/jobs",
        icon: BriefcaseBusiness,
      },
      {
        title: "My Applications",
        url: "/applications",
        icon: ClipboardPen,
      },
      {
        title: "Profile",
        url: "/profile",
        icon: User,
      },
    ],
    navSecondary: [
      {
        title: "Notifications",
        id: "notifications",
        url: "#",
        icon: Bell,
        isActive: false,
        handleClick: () => setIsNotifOpen(true),
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        isActive: false,
        handleClick: () => {},
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center p-4">
          <img
            src={data.header.icon.src}
            alt="MMCL Careers"
            className="h-auto size-16"
          />
          <span className="ml-3 text-3xl font-bold">Careers</span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <NavMain items={data.navMain} />
        <Separator />
        <NavSecondary items={data.navSecondary} />
        <NotificationSheet open={isNotifOpen} onOpenChange={setIsNotifOpen} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser
          user={{
            name: "Daniel Sarabusing",
            email: "john.doe@example.com",
            avatar: "/path/to/avatar.jpg",
          }}
        ></NavUser>
      </SidebarFooter>
    </Sidebar>
  );
}
