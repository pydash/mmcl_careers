"use client";

// React
import { useEffect, useRef, useState } from "react";

// Next.js
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

// Hooks
import useSubmitApplication from "@/hooks/applicant/jobs/useSubmitApplication";

// Page sections
import { AppBreadcrumbs } from "@/components/applicant/breadcrumb";
import PitchCard from "@/components/applicant/jobs/job/application-form/pitch-card";
import ReviewProfileCard from "@/components/applicant/jobs/job/application-form/review-profile-card";
import ReviewConfirmation from "@/components/applicant/jobs/job/application-form/review-confirmation";

// UI
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Timing constants (ms)
const PITCH_ALERT_TIMEOUT_MS = 5000;
const SUCCESS_REDIRECT_TIMEOUT_MS = 5000;

export default function JobApplyPage() {
  // Router/navigation
  const router = useRouter();

  // Form state
  const [pitchValue, setPitchValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // UI feedback state
  const [showPitchAlert, setShowPitchAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Alert timers (cleared on unmount)
  const alertTimerRef = useRef<NodeJS.Timeout | null>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { submitApplication, loading, error } = useSubmitApplication();

  // Route param for the selected job
  const { id: job_pub_id } = useParams<{ id: string }>();

  // Derived state
  const hasPitch = Boolean(pitchValue.trim());
  const canSubmit = confirmed && hasPitch && !loading;

  // Utility: safely clear a running timer
  const clearTimer = (
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>,
  ) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Show temporary validation alert when pitch is empty
  const showPitchRequiredAlert = () => {
    setShowPitchAlert(true);
    clearTimer(alertTimerRef);
    alertTimerRef.current = setTimeout(() => {
      setShowPitchAlert(false);
    }, PITCH_ALERT_TIMEOUT_MS);
  };

  // Submit flow: validate -> submit -> show success -> redirect
  const handleSubmitApplication = async () => {
    // Guard: pitch is required
    if (!hasPitch) {
      showPitchRequiredAlert();
      return;
    }

    try {
      await submitApplication({ job_pub_id, pitch: pitchValue });
    } catch {
      return;
    }

    // Show success then redirect
    setShowSuccessAlert(true);
    clearTimer(successTimerRef);
    successTimerRef.current = setTimeout(() => {
      setShowSuccessAlert(false);
      router.push("/applicant/dashboard");
    }, SUCCESS_REDIRECT_TIMEOUT_MS);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimer(alertTimerRef);
      clearTimer(successTimerRef);
    };
  }, []);

  if (error) {
    return (
      <div className="text-red-500">Error submitting application: {error}</div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Validation alert (missing pitch) */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
            showPitchAlert ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="mx-auto max-w-md mt-4 px-4 bg-white">
            <Alert variant="destructive">
              <AlertTitle>Pitch required</AlertTitle>
              <AlertDescription>
                Please answer the question before submitting your application.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Success alert */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
            showSuccessAlert ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="mx-auto max-w-md mt-4">
            <Alert className="border-green-500 bg-green-50 text-green-900">
              <AlertTitle>Application sent!</AlertTitle>
              <AlertDescription className="text-green-800">
                Your application has been successfully submitted.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <AppBreadcrumbs />
        <ReviewProfileCard />
        <PitchCard pitch={pitchValue} onPitchChange={setPitchValue} />
        <ReviewConfirmation
          confirmed={confirmed}
          onConfirmedChange={setConfirmed}
        />
        <Separator className="my-4" />
        <div className="flex justify-start gap-4">
          <Button
            variant="default"
            size="default"
            onClick={handleSubmitApplication}
            disabled={!canSubmit}
            className="rounded-none bg-blue-600 hover:bg-blue-700"
          >
            Submit Application
          </Button>
          <Button
            variant="outline"
            size="default"
            className="rounded-none shadow-none"
            asChild
          >
            <Link href="/applicant/jobs">Cancel</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
