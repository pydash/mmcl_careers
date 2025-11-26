"use client";

import { Separator } from "./ui/separator";
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
  return (
    <>
      {items.map((item) => (
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
                      className={
                        "text-md" + (item.isActive ? " font-bold" : "")
                      }
                    >
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
