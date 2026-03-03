"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import useSubmitApplication from "@/hooks/applicant/jobs/useSubmitApplication";

import { AppBreadcrumbs } from "@/components/applicant/breadcrumb";
import ReviewProfileCard from "@/components/applicant/jobs/job/application-form/review-profile-card";
import PitchCard from "@/components/applicant/jobs/job/application-form/pitch-card";
import ReviewConfirmation from "@/components/applicant/jobs/job/application-form/review-confirmation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function JobApplyPage() {
  const router = useRouter();
  const params = useParams();
  const job_pub_id = params.pub_id;

  const [pitchValue, setPitchValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [showPitchAlert, setShowPitchAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const alertTimerRef = useRef<NodeJS.Timeout | null>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { submitApplication, loading, error } = useSubmitApplication();

  const showAlert = (
    setter: (value: boolean) => void,
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>,
  ) => {
    setter(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setter(false), 5000);
  };

  const handleSubmit = async () => {
    if (!pitchValue.trim()) {
      showAlert(setShowPitchAlert, alertTimerRef);
      return;
    }

    try {
      await submitApplication({ job_pub_id, pitch: pitchValue });
      showAlert(setShowSuccessAlert, successTimerRef);
      setTimeout(() => router.push("/applicant/dashboard"), 5000);
    } catch (err) {
      console.error("Application submission failed:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  if (error) {
    return (
      <div className="text-red-500">Error submitting application: {error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Alert Notifications */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showPitchAlert ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-md mt-4 px-4">
          <Alert variant="destructive" className="bg-white">
            <AlertTitle>Pitch required</AlertTitle>
            <AlertDescription>
              Please answer the question before submitting your application.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showSuccessAlert ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-md mt-4 px-4">
          <Alert className="border-green-500 bg-green-50 text-green-900">
            <AlertTitle>Application sent!</AlertTitle>
            <AlertDescription className="text-green-800">
              Your application has been successfully submitted.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Application Form */}
      <AppBreadcrumbs />
      <ReviewProfileCard />
      <PitchCard pitch={pitchValue} onPitchChange={setPitchValue} />
      <ReviewConfirmation
        confirmed={confirmed}
        onConfirmedChange={setConfirmed}
      />

      {/* Action Buttons */}
      <Separator className="my-4" />
      <div className="flex justify-start gap-3">
        <Button
          variant="default"
          size="lg"
          onClick={handleSubmit}
          disabled={loading || !confirmed}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6"
          asChild
        >
          <Link href="/applicant/jobs">Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
