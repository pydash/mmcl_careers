"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetHeader,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import Sidebar from "@/components/applicant/dashboard/sidebar";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import Notifications from "@/components/applicant/dashboard/notifications";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ email: string | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to load session");
        }

        const data = await res.json();
        setProfile({ email: data.email ?? null });
        setLoading(false);
      } catch (err: any) {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Error loading profile: {error}</p>;

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <div className="flex flex-1 items-center justify-between gap-2">
            <h1 className="text-lg font-semibold">Dashboard</h1>
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
        <div className="grid grid-cols-[6fr_4fr] gap-4 p-4">
          <div className="flex flex-col gap-4">
            <div className="aspect-video rounded-xl bg-muted/50">Col 1</div>
            <div className="aspect-video rounded-xl bg-muted/50">Col 1</div>
            <div className="aspect-video rounded-xl bg-muted/50">Col 1</div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">Col 2</div>
        </div>
      </main>
    </div>
  );
}
