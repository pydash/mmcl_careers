"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, preferences, and notifications.
        </p>
      </header>

      <section className="flex flex-col gap-4 border p-4">
        <div>
          <h2 className="text-lg font-semibold">Account</h2>
          <p className="text-sm text-muted-foreground">
            Update your contact details and password.
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col col-span-2 gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>Save changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Choose how you want to be notified.
            </p>
          </div>
          <Separator />
          <div className="flex items-start gap-2">
            <Checkbox id="notif-email" defaultChecked />
            <Label htmlFor="notif-email" className="leading-6">
              Email me about application updates
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="notif-sms" />
            <Label htmlFor="notif-sms" className="leading-6">
              Send SMS for interview invites
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="notif-push" defaultChecked />
            <Label htmlFor="notif-push" className="leading-6">
              Push notifications for new matches
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div>
            <h2 className="text-lg font-semibold">Job Alerts</h2>
            <p className="text-sm text-muted-foreground">
              Customize the roles you want to hear about.
            </p>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Preferred Role</Label>
            <Input id="role" placeholder="Nurse, Engineer, Sales" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Preferred Location</Label>
            <Input id="location" placeholder="Manila, Cebu" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="salary">Target Monthly Salary</Label>
            <Input id="salary" placeholder="₱35,000" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div>
            <h2 className="text-lg font-semibold">Preferences</h2>
            <p className="text-sm text-muted-foreground">
              Set your language and time preferences.
            </p>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label>Language</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fil">Filipino</SelectItem>
                <SelectItem value="jp">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Timezone</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia-manila">Asia/Manila</SelectItem>
                <SelectItem value="asia-singapore">Asia/Singapore</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div>
            <h2 className="text-lg font-semibold">Privacy</h2>
            <p className="text-sm text-muted-foreground">
              Control who can view your profile.
            </p>
          </div>
          <Separator />
          <div className="flex items-start gap-2">
            <Checkbox id="searchable" defaultChecked />
            <Label htmlFor="searchable" className="leading-6">
              Allow employers to find my profile
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="public-profile" />
            <Label htmlFor="public-profile" className="leading-6">
              Show my profile publicly
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="visibility-note">Visibility note</Label>
            <Textarea
              id="visibility-note"
              placeholder="Add a note for recruiters (optional)"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-lg border p-4">
        <div>
          <h2 className="text-lg font-semibold">Security</h2>
          <p className="text-sm text-muted-foreground">
            Manage active sessions and secure your account.
          </p>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline">View active sessions</Button>
          <Button variant="destructive">Log out of all devices</Button>
        </div>
      </section>
    </main>
  );
}
