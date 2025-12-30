import { Sidebar as SidebarComponent } from "@/components/sidebar";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardPen,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar() {
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
  return <SidebarComponent title={app_title} items={items} />;
}
