"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6">
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="you@example.com" disabled />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" disabled />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <SquarePen size={16} />
                Edit Account Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Account Information</DialogTitle>
                <DialogDescription>
                  Update your email and password below.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <FieldGroup>
                  <Field>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="edit-password">Password</Label>
                    <Input
                      id="edit-password"
                      type="password"
                      placeholder="********"
                    />
                  </Field>
                </FieldGroup>
              </form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Save Changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-4 border p-4">
          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Choose how you want to be notified.
            </p>
          </div>
          <Separator />
          <div className="flex items-start gap-2">
            <Checkbox id="notif-email" />
            <Label htmlFor="notif-email" className="">
              Email me about application updates
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="notif-sms" />
            <Label htmlFor="notif-sms" className="">
              Send SMS for interview invites
            </Label>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-4 border p-4">
          <div>
            <h2 className="text-lg font-semibold">Theme Preferences</h2>
            <p className="text-sm text-muted-foreground">
              Customize your application appearance.
            </p>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label>Theme</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </main>
  );
}
