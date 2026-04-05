"use client";

import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import { useNotifications } from "@/hooks/useNotifications";
import { getDateTime } from "@/utils/formatDate";
import { Bell, BellOff } from "lucide-react";

export default function Notifications() {
  const { notifications, loading, error } = useNotifications();

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading notifications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mx-4 mt-4 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-sm text-red-600 font-medium">
          Error loading notifications: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4 md:p-0">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
          <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <BellOff className="h-6 w-6 text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-900">No notifications yet</p>
          <p className="text-xs text-slate-500 mt-1">
            We'll let you know when something important happens.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {notifications.map((notification) => (
            <Item 
              key={notification.id} 
              className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-red-200 transition-all group"
            >
              <ItemContent className="flex flex-col gap-1">
                <div className="flex items-start justify-between gap-4">
                  <ItemTitle className="text-sm md:text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                    {notification.title}
                  </ItemTitle>
                  <div className="h-2 w-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                </div>
                
                <ItemDescription className="text-sm text-slate-600 leading-relaxed">
                  {notification.message}
                </ItemDescription>
                
                <div className="mt-2 flex items-center gap-2">
                  <Bell className="h-3 w-3 text-slate-400" />
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {getDateTime(notification.date)}
                  </p>
                </div>
              </ItemContent>
            </Item>
          ))}
        </div>
      )}
    </div>
  );
}