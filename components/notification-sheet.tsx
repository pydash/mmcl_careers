import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import NotificationItem from "./ui/notif-item";

export function NotificationSheet({ open, onOpenChange }) {
  const data = [
    {
      id: 1,
      title: "You have been selected for an interview!",
      message:
        "Congratulations! We are pleased to inform you that you have been selected for an interview for the position you applied for at our company. Please check your email for further details.",
      timestamp: "2024-06-15 10:30 AM",
      read: false,
    },
    {
      id: 2,
      title: "Application Received",
      message:
        "We have received your application. Our team will review it and get back to you shortly.",
      timestamp: "2024-06-14 09:00 AM",
      read: true,
    },
  ];
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Notifications</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {data.map((notif) => {
            return (
              <>
                <NotificationItem key={notif.id} data={notif} />
                <Separator />
              </>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
