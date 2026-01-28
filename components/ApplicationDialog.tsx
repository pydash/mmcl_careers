"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X}  from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTransition } from "react";
import { cancelApplication } from "@/app/applicant/applications/server-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface ApplicationDialogProps {
  app: any;
  profile: any;
}

export function ApplicationDialog({ app, profile }: ApplicationDialogProps) {
  const [activeTab, setActiveTab] = useState("Application");
    const [isPending, startTransition] = useTransition();
      const [ConfirmedAlert, setConfirmedAlert] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-30 bg-[#001C43] text-white hover:bg-gray-100">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Your Application Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-3 border-b border-gray-200 pb-2">
            <button
              className={`font-normal hover:underline cursor-pointer px-2 py-1 ${
                activeTab === "Application" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("Application")}
            >
              Application
            </button>
            <button
              className={`font-normal hover:underline cursor-pointer px-2 py-1 ${
                activeTab === "Profile" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("Profile")}
            >
              Profile
            </button>
            <button
              className={`font-normal hover:underline cursor-pointer px-2 py-1 ${
                activeTab === "Essay" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("Essay")}
            >
              Essay
            </button>
          </div>
          {activeTab === "Application" && (
            <div className="space-y-3">
              <div>
                <label className="text-sm text-black">Application Number:</label>
                <p className="font-normal">{app.app_number}</p>
              </div>
              <div>
                <label className="text-sm text-black">Applying For:</label>
                <p className="font-normal">{app.position}</p>
              </div>
              <div>
                <label className="text-sm text-black">Current Status:</label>
                <p className="font-normal flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      app.status?.toLowerCase().includes('pending') ? 'bg-yellow-500' :
                      app.status?.toLowerCase().includes('accepted') ? 'bg-green-500' :
                      app.status?.toLowerCase().includes('deferred') || app.status?.toLowerCase().includes('deffered') ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}
                  ></span>
                  {app.status}
                </p>
              </div>
              <div>
                <label className="text-sm text-black">Applied Date:</label>
                <p className="font-normal">
                  {new Date(app.applied_date).toLocaleDateString()}
                </p>
              </div>
              <div>
            <label className="font-semibold">Description:</label>
            <p className="text-sm text-muted-foreground">{app.description}</p>
          </div>
            </div>
          )}
          {activeTab === "Profile" && (
            <div className="space-y-3">
              {profile ? (
                <>
                  <div>
                    <label className="text-sm text-black">Full Name:</label>
                    <p className="font-normal">{profile.full_name || profile.name || profile.first_name + ' ' + profile.last_name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Date of Birth:</label>
                    <p className="font-normal">
                      {profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Sex:</label>
                    <p className="font-normal">{profile.sex || profile.gender || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Citizenship:</label>
                    <p className="font-normal">{profile.citizenship || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Civil Status:</label>
                    <p className="font-normal">{profile.civil_status || profile.marital_status || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Phone Number:</label>
                    <p className="font-normal">{profile.phone_number || profile.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Address:</label>
                    <p className="font-normal">{profile.address || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Honorifics:</label>
                    <p className="font-normal">{profile.honorifics || profile.title || "Not provided"}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No profile information available.</p>
              )}
            </div>
          )}
          {activeTab === "Essay" && (
            <div className="space-y-3">
              <div>
                <label className="text-sm text-black">Essay:</label>
                <p className="font-normal text-sm leading-relaxed">
                  {app.pitch || "No pitch provided"}
                </p>
              </div>
            </div>
          )}
          
        {ConfirmedAlert && (
  <div
    className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 translate-y-0"
  >
    <div className="mx-auto max-w-md mt-4 px-4">
      <Alert className="border-yellow-500 bg-yellow-50 text-yellow-900">
        <AlertTitle>Are you sure you want to cancel this application?</AlertTitle>
        <AlertDescription className="flex justify-end gap-2 mt-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirmedAlert(false)}
                >
                    No
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                    startTransition(() => {
                        cancelApplication(app.id);
                    });
                    setConfirmedAlert(false);
                    }}
                >
                    Yes
                </Button>
                </AlertDescription>
            </Alert>
            </div>
        </div>
        )}
          <div>
            {app.status?.toLowerCase() === "pending" && (
                <Button
                className="w-45 bg-red-600 text-white hover:bg-red-700"
                disabled={isPending || ConfirmedAlert || app.status?.toLowerCase() !== "pending"}
                onClick={() => setConfirmedAlert(true)}
                >
                {isPending ? "Cancelling..." : "Cancel Application"}
                <X className="ml-2 h-4 w-4" />
                </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}