import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Account</p>
          <h2 className="text-xl font-semibold">Profile settings</h2>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" defaultValue="Taylor Morgan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue="Head of People" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue="taylor@mmcl.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(+65) 1234 5678"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save profile</Button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Security</p>
          <h2 className="text-xl font-semibold">Access controls</h2>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Reset password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="New password"
            />
          </div>
          <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
            <div>
              <p className="text-sm font-medium">Multi-factor authentication</p>
              <p className="text-sm text-muted-foreground">
                Recommended for all HR admins.
              </p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="flex justify-end">
            <Button>Update security</Button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Notifications</p>
          <h2 className="text-xl font-semibold">Preferences</h2>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
            <div>
              <p className="text-sm font-medium">Daily digest</p>
              <p className="text-sm text-muted-foreground">
                Summary of new applicants and status changes.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Toggle
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
            <div>
              <p className="text-sm font-medium">Interview reminders</p>
              <p className="text-sm text-muted-foreground">
                Send 24h and 1h reminders to panel.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Toggle
            </Button>
          </div>
          <Separator />
          <div className="flex justify-end">
            <Button>Save preferences</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
