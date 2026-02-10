"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Notifications from "@/components/applicant/notifications";
import Sidebar from "@/components/hr/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { title } from "process";

const menuItems = [
  { title: "Dashboard", href: "/hr/dashboard" },
  { title: "Manage Jobs", href: "/hr/jobs" },
  { title: "Manage Applicants", href: "/hr/applicants" },
  { title: "Analytics", href: "/hr/analytics" },
  { title: "Profile", href: "/hr/profile" },
  { title: "Settings", href: "/hr/settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const secondSegment = segments[1];

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
        });
        if (!response.ok) {
          router.push("/hr/login");
        }
      } catch (error) {
        router.push("/hr/login");
      }
    };

    checkSession();
  }, [router]);

  const currentPage = menuItems.find((item) =>
    item.href.includes(`/hr/${secondSegment}`),
  );
  const pageTitle = currentPage?.title || "Dashboard";
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <div className="flex flex-1 items-center justify-between gap-2">
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-96 p-0">
                <SheetHeader className="p-4">
                  <SheetTitle>Notifications</SheetTitle>
                  <Separator />
                </SheetHeader>
                <div className="p-4">
                  <Notifications />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
