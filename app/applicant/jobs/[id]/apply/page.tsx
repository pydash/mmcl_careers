"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

import useSubmitApplication from "@/hooks/applicant/jobs/useSubmitApplication";

import { AppBreadcrumbs } from "@/components/applicant/breadcrumb";
import PitchCard from "@/components/applicant/jobs/job-specific/application-form/pitch-card";
import ReviewProfileCard from "@/components/applicant/jobs/job-specific/application-form/review-profile-card";
import ReviewConfirmation from "@/components/applicant/jobs/job-specific/application-form/review-confirmation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function JobApplyPage() {
  const [pitchValue, setPitchValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [showPitchAlert, setShowPitchAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const alertTimerRef = useRef<NodeJS.Timeout | null>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { submitApplication, loading, error } = useSubmitApplication();
  const params = useParams<{ id: string }>();
  const jobId = params.id;

  const handleSubmit = async () => {
    if (!pitchValue.trim()) {
      setShowPitchAlert(true);
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
      alertTimerRef.current = setTimeout(() => setShowPitchAlert(false), 5000);
      return;
    }
    await submitApplication({ jobId, pitch: pitchValue });

    setShowSuccessAlert(true);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = setTimeout(() => {
      setShowSuccessAlert(false);
      redirect("/applicant/dashboard");
    }, 5000);
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
    <>
      <div className="flex flex-col gap-4">
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
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
            showSuccessAlert ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="mx-auto max-w-md mt-4 px-4 bg-white">
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
        <div className="flex justify-start">
          <Button
            variant="default"
            size="default"
            onClick={() => handleSubmit()}
            disabled={loading || !confirmed}
          >
            Submit Application
          </Button>
          <Button variant="outline" size="default" className="ml-4">
            <Link href="/applicant/jobs">Cancel</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
