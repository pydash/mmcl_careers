"use client";

// components/sidebar.tsx
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.service";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  title: string;
  items: NavItem[];
}

export function Sidebar({ title, items }: SidebarProps) {
  const pathname = usePathname();

  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        router.push("/login");
      }
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4 gap-2">
        <Image src="/logo_block.png" width={42} height={42} alt="MMCL Logo" />
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-3 p-2">
        {items.map((item, index) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const isLastItem = index === items.length - 1;

          return (
            <div key={item.href}>
              {isLastItem && <Separator className="my-2" />}
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                  isActive && "shadow-none",
                  "w-full justify-start gap-2",
                )}
              >
                <item.icon className="h-6 w-6" />
                {item.title}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-2">
        <button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start gap-2 text-red-500",
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
