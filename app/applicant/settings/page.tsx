"use client";

import { useEffect, useState } from "react";

import { getSettings, updateAccount, updatePreferences } from "./action";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
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

import { SquarePen } from "lucide-react";

/* ===== Types ===== */
type SettingsState = {
  error: string | null;
};

export default function SettingsPage() {
  /* ===== State ===== */
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("light");
  const [emailNotif, setEmailNotif] = useState(false);
  const [systemNotif, setSystemNotif] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // Loading state for initial data

  // Account loading/error
  const [accountPending, setAccountPending] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  // Notifications loading/error
  const [notifPending, setNotifPending] = useState(false);
  const [notifError, setNotifError] = useState<string | null>(null);

  // Theme loading/error
  const [themePending, setThemePending] = useState(false);
  const [themeError, setThemeError] = useState<string | null>(null);

  /* ===== Load Existing Settings ===== */
  useEffect(() => {
    async function load() {
      const data = await getSettings();
      if (data) {
        setEmail(data.email);
        setTheme(data.theme_preference);
        setEmailNotif(data.email_notifications);
        setSystemNotif(data.system_notifications);
      }
      setIsLoading(false); // finished loading
    }
    load();
  }, []);

  /* ===== Handlers ===== */
  const handleAccountSubmit = async (formData: FormData) => {
    setAccountPending(true);
    const result = await updateAccount({ error: null }, formData);
    setAccountError(result.error ?? null);
    setAccountPending(false);

    if (!result.error) setIsDialogOpen(false);
  };

  const handleNotifSubmit = async (formData: FormData) => {
    setNotifPending(true);
    const result = await updatePreferences({ error: null }, formData);
    setNotifError(result.error ?? null);
    setNotifPending(false);
  };

  const handleThemeSubmit = async (formData: FormData) => {
    setThemePending(true);
    const result = await updatePreferences({ error: null }, formData);
    setThemeError(result.error ?? null);
    setThemePending(false);
  };

  /* ===== JSX ===== */
  return (
    <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, preferences, and notifications.
        </p>
      </header>

      {/* ================= ACCOUNT ================= */}
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
            <Input id="email" value={email} disabled />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value="********" disabled />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  await handleAccountSubmit(form);
                }}
                className="grid gap-4 py-4"
              >
                <FieldGroup>
                  <Field>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      name="email"
                      type="email"
                      defaultValue={email}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="edit-password">Password</Label>
                    <Input
                      id="edit-password"
                      name="password"
                      type="password"
                      placeholder="Leave blank to keep current"
                    />
                  </Field>
                </FieldGroup>

                {accountError && (
                  <p className="text-sm text-destructive">{accountError}</p>
                )}

                <DialogFooter>
                  <Button type="submit" disabled={accountPending}>
                    {accountPending ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* ================= NOTIFICATIONS ================= */}
      <section className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-4 border p-4">
          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Choose how you want to be notified.
            </p>
          </div>

          <Separator />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData();
              form.set("emailNotifications", emailNotif ? "on" : "");
              form.set("systemNotifications", systemNotif ? "on" : "");
              handleNotifSubmit(form);
            }}
            className="flex flex-col gap-4"
          >
            {/* Email Notification */}
            <div className="flex items-start gap-2">
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
              ) : (
                <Checkbox
                  id="notif-email"
                  checked={emailNotif}
                  onCheckedChange={(v) => setEmailNotif(Boolean(v))}
                />
              )}
              <Label htmlFor="notif-email">
                Email me about application updates
              </Label>
            </div>

            {/* System Notification */}
            <div className="flex items-start gap-2">
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
              ) : (
                <Checkbox
                  id="notif-sms"
                  checked={systemNotif}
                  onCheckedChange={(v) => setSystemNotif(Boolean(v))}
                />
              )}
              <Label htmlFor="notif-sms">Send SMS for interview invites</Label>
            </div>

            {notifError && (
              <p className="text-sm text-destructive">{notifError}</p>
            )}

            <Button
              type="submit"
              disabled={notifPending || isLoading}
              className="w-fit"
            >
              {notifPending ? "Saving..." : "Save Notification Preferences"}
            </Button>
          </form>
        </div>
      </section>

      {/* ================= THEME ================= */}
      <section className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-4 border p-4">
          <div>
            <h2 className="text-lg font-semibold">Theme Preferences</h2>
            <p className="text-sm text-muted-foreground">
              Customize your application appearance.
            </p>
          </div>

          <Separator />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData();
              form.set("theme", theme);
              handleThemeSubmit(form);
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label>Theme</Label>
              <Select
                name="theme"
                value={theme}
                onValueChange={setTheme}
                disabled={isLoading} // <-- disabled while loading
              >
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

            {themeError && (
              <p className="text-sm text-destructive">{themeError}</p>
            )}

            <Button
              type="submit"
              disabled={themePending || isLoading}
              className="w-fit"
            >
              {themePending ? "Saving..." : "Save Theme"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// import { getSettings, updateAccount, updatePreferences } from "./action";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Field, FieldGroup } from "@/components/ui/field";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { SquarePen } from "lucide-react";

// /* ===== Types ===== */
// type SettingsState = {
//   error: string | null;
// };

// export default function SettingsPage() {
//   /* ===== State ===== */
//   const [email, setEmail] = useState("");
//   const [theme, setTheme] = useState("light");
//   const [emailNotif, setEmailNotif] = useState(true);
//   const [systemNotif, setSystemNotif] = useState(true);

//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Account loading/error
//   const [accountPending, setAccountPending] = useState(false);
//   const [accountError, setAccountError] = useState<string | null>(null);

//   // Notifications loading/error
//   const [notifPending, setNotifPending] = useState(false);
//   const [notifError, setNotifError] = useState<string | null>(null);

//   // Theme loading/error
//   const [themePending, setThemePending] = useState(false);
//   const [themeError, setThemeError] = useState<string | null>(null);

//   /* ===== Load Existing Settings ===== */
//   useEffect(() => {
//     async function load() {
//       const data = await getSettings();
//       if (!data) return;

//       setEmail(data.email);
//       setTheme(data.theme_preference);
//       setEmailNotif(data.email_notifications);
//       setSystemNotif(data.system_notifications);
//     }
//     load();
//   }, []);

//   /* ===== Handlers ===== */
//   const handleAccountSubmit = async (formData: FormData) => {
//     setAccountPending(true);
//     const result = await updateAccount({ error: null }, formData);
//     setAccountError(result.error ?? null);
//     setAccountPending(false);

//     if (!result.error) setIsDialogOpen(false);
//   };

//   const handleNotifSubmit = async (formData: FormData) => {
//     setNotifPending(true);
//     const result = await updatePreferences({ error: null }, formData);
//     setNotifError(result.error ?? null);
//     setNotifPending(false);
//   };

//   const handleThemeSubmit = async (formData: FormData) => {
//     setThemePending(true);
//     const result = await updatePreferences({ error: null }, formData);
//     setThemeError(result.error ?? null);
//     setThemePending(false);
//   };

//   return (
//     <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6">
//       <header className="flex flex-col gap-1">
//         <h1 className="text-2xl font-semibold">Settings</h1>
//         <p className="text-sm text-muted-foreground">
//           Manage your account, preferences, and notifications.
//         </p>
//       </header>

//       {/* ================= ACCOUNT ================= */}
//       <section className="flex flex-col gap-4 border p-4">
//         <div>
//           <h2 className="text-lg font-semibold">Account</h2>
//           <p className="text-sm text-muted-foreground">
//             Update your contact details and password.
//           </p>
//         </div>

//         <Separator />

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" value={email} disabled />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" value="********" disabled />
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center gap-2"
//               >
//                 <SquarePen size={16} />
//                 Edit Account Info
//               </Button>
//             </DialogTrigger>

//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Account Information</DialogTitle>
//                 <DialogDescription>
//                   Update your email and password below.
//                 </DialogDescription>
//               </DialogHeader>

//               <form
//                 onSubmit={async (e) => {
//                   e.preventDefault();
//                   const form = new FormData(e.currentTarget);
//                   await handleAccountSubmit(form);
//                 }}
//                 className="grid gap-4 py-4"
//               >
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="edit-email">Email</Label>
//                     <Input
//                       id="edit-email"
//                       name="email"
//                       type="email"
//                       defaultValue={email}
//                     />
//                   </Field>

//                   <Field>
//                     <Label htmlFor="edit-password">Password</Label>
//                     <Input
//                       id="edit-password"
//                       name="password"
//                       type="password"
//                       placeholder="Leave blank to keep current"
//                     />
//                   </Field>
//                 </FieldGroup>

//                 {accountError && (
//                   <p className="text-sm text-destructive">{accountError}</p>
//                 )}

//                 <DialogFooter>
//                   <Button type="submit" disabled={accountPending}>
//                     {accountPending ? "Saving..." : "Save Changes"}
//                   </Button>
//                 </DialogFooter>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </section>

//       {/* ================= NOTIFICATIONS ================= */}
//       <section className="grid grid-cols-1 gap-4">
//         <div className="flex flex-col gap-4 border p-4">
//           <div>
//             <h2 className="text-lg font-semibold">Notifications</h2>
//             <p className="text-sm text-muted-foreground">
//               Choose how you want to be notified.
//             </p>
//           </div>

//           <Separator />

//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               const form = new FormData();
//               form.set("emailNotifications", emailNotif ? "on" : "");
//               form.set("systemNotifications", systemNotif ? "on" : "");
//               handleNotifSubmit(form);
//             }}
//             className="flex flex-col gap-4"
//           >
//             <div className="flex items-start gap-2">
//               <Checkbox
//                 id="notif-email"
//                 checked={emailNotif}
//                 onCheckedChange={(v) => setEmailNotif(Boolean(v))}
//               />
//               <Label htmlFor="notif-email">
//                 Email me about application updates
//               </Label>
//             </div>

//             <div className="flex items-start gap-2">
//               <Checkbox
//                 id="notif-sms"
//                 checked={systemNotif}
//                 onCheckedChange={(v) => setSystemNotif(Boolean(v))}
//               />
//               <Label htmlFor="notif-sms">Send SMS for interview invites</Label>
//             </div>

//             {notifError && (
//               <p className="text-sm text-destructive">{notifError}</p>
//             )}

//             <Button type="submit" disabled={notifPending} className="w-fit">
//               {notifPending ? "Saving..." : "Save Notification Preferences"}
//             </Button>
//           </form>
//         </div>
//       </section>

//       {/* ================= THEME ================= */}
//       <section className="grid grid-cols-1 gap-4">
//         <div className="flex flex-col gap-4 border p-4">
//           <div>
//             <h2 className="text-lg font-semibold">Theme Preferences</h2>
//             <p className="text-sm text-muted-foreground">
//               Customize your application appearance.
//             </p>
//           </div>

//           <Separator />

//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               const form = new FormData();
//               form.set("theme", theme);
//               handleThemeSubmit(form);
//             }}
//             className="flex flex-col gap-4"
//           >
//             <div className="flex flex-col gap-2">
//               <Label>Theme</Label>
//               <Select name="theme" value={theme} onValueChange={setTheme}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select theme" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="light">Light</SelectItem>
//                   <SelectItem value="dark">Dark</SelectItem>
//                   <SelectItem value="system">System Default</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {themeError && (
//               <p className="text-sm text-destructive">{themeError}</p>
//             )}

//             <Button type="submit" disabled={themePending} className="w-fit">
//               {themePending ? "Saving..." : "Save Theme"}
//             </Button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Field, FieldGroup } from "@/components/ui/field";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { SquarePen } from "lucide-react";

// export default function SettingsPage() {
//   return (
//     <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6">
//       <header className="flex flex-col gap-1">
//         <h1 className="text-2xl font-semibold">Settings</h1>
//         <p className="text-sm text-muted-foreground">
//           Manage your account, preferences, and notifications.
//         </p>
//       </header>

//       <section className="flex flex-col gap-4 border p-4">
//         <div>
//           <h2 className="text-lg font-semibold">Account</h2>
//           <p className="text-sm text-muted-foreground">
//             Update your contact details and password.
//           </p>
//         </div>
//         <Separator />
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" placeholder="you@example.com" disabled />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" disabled />
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center gap-2"
//               >
//                 <SquarePen size={16} />
//                 Edit Account Info
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Account Information</DialogTitle>
//                 <DialogDescription>
//                   Update your email and password below.
//                 </DialogDescription>
//               </DialogHeader>
//               <form className="grid gap-4 py-4">
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="edit-email">Email</Label>
//                     <Input
//                       id="edit-email"
//                       type="email"
//                       placeholder="you@example.com"
//                     />
//                   </Field>
//                   <Field>
//                     <Label htmlFor="edit-password">Password</Label>
//                     <Input
//                       id="edit-password"
//                       type="password"
//                       placeholder="********"
//                     />
//                   </Field>
//                 </FieldGroup>
//               </form>
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button>Save Changes</Button>
//                 </DialogClose>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </section>

//       <section className="grid grid-cols-1 gap-4">
//         <div className="flex flex-col gap-4 border p-4">
//           <div>
//             <h2 className="text-lg font-semibold">Notifications</h2>
//             <p className="text-sm text-muted-foreground">
//               Choose how you want to be notified.
//             </p>
//           </div>
//           <Separator />
//           <div className="flex items-start gap-2">
//             <Checkbox id="notif-email" />
//             <Label htmlFor="notif-email" className="">
//               Email me about application updates
//             </Label>
//           </div>
//           <div className="flex items-start gap-2">
//             <Checkbox id="notif-sms" />
//             <Label htmlFor="notif-sms" className="">
//               Send SMS for interview invites
//             </Label>
//           </div>
//         </div>
//       </section>

//       <section className="grid grid-cols-1 gap-4">
//         <div className="flex flex-col gap-4 border p-4">
//           <div>
//             <h2 className="text-lg font-semibold">Theme Preferences</h2>
//             <p className="text-sm text-muted-foreground">
//               Customize your application appearance.
//             </p>
//           </div>
//           <Separator />
//           <div className="flex flex-col gap-2">
//             <Label>Theme</Label>
//             <Select>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select theme" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="light">Light</SelectItem>
//                 <SelectItem value="dark">Dark</SelectItem>
//                 <SelectItem value="system">System Default</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
