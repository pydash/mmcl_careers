"use client";

import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import { useNotifications } from "@/hooks/useNotifications";
import { getDateTime } from "@/utils/formatDate";

export default function Notifications() {
  const { notifications, loading, error } = useNotifications();

  if (loading) return <p className="p-4">Loading notifications...</p>;
  if (error) return <p className="p-4">Error loading notifications: {error}</p>;
  return (
    <>
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <Item key={notification.id} className="bg-gray-100">
            <ItemContent>
              <ItemTitle>{notification.title}</ItemTitle>
              <ItemDescription>{notification.message}</ItemDescription>
              <p className="text-sm text-muted-foreground">
                {getDateTime(notification.date)}
              </p>
            </ItemContent>
          </Item>
        ))
      )}
    </>
  );
}
