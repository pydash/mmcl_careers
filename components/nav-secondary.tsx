import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { type LucideIcon } from "lucide-react";

export function NavSecondary({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive: boolean;
    handleClick?: () => void;
  }[];
}) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const active = pathname.startsWith(item.url);
        return (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    onClick={item.handleClick}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span
                        className={"text-md" + (active ? " font-bold" : "")}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </>
  );
}
