import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import NotificationItem from "./ui/notif-item";

export function NotificationSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
    {
      id: 3,
      title: "Interview Reminder",
      message:
        "This is a reminder for your upcoming interview scheduled for tomorrow at 2:00 PM. Please be prepared and arrive on time.",
      timestamp: "2024-06-16 01:00 PM",
      read: false,
    },
    {
      id: 4,
      title: "Application Update",
      message:
        "Your application status has been updated. Please log in to your account to view the latest information.",
      timestamp: "2024-06-17 11:00 AM",
      read: false,
    },
    {
      id: 5,
      title: "Thank You for Applying",
      message:
        "Thank you for applying to our company. We appreciate your interest and will keep your application on file for future opportunities.",
      timestamp: "2024-06-13 08:30 AM",
      read: true,
    },
    {
      id: 6,
      title: "Interview Feedback",
      message:
        "We would like to provide you with feedback from your recent interview. Please check your email for detailed information.",
      timestamp: "2024-06-18 03:00 PM",
      read: true,
    },
  ];
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle>Your Notifications</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="grid grid-cols-1">
          {data.map((notif) => {
            return (
              <>
                <NotificationItem key={notif.id} data={notif} />
                <div className="mx-4">
                  <Separator />
                </div>
              </>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
