import { Switch } from "@/components/ui/switch";

export default function NotificationsTab() {
  return (
    <div>
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="">Email Notifications</label>
            <span className="text-sm text-muted-foreground">
              Receive notifications via email.
            </span>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="">SMS Notifications</label>
            <span className="text-sm text-muted-foreground">
              Receive notifications via SMS.
            </span>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="">Push Notifications</label>
            <span className="text-sm text-muted-foreground">
              Receive notifications via push notifications.
            </span>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
}
