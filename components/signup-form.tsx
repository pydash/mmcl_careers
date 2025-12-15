"use client";

import { useState } from "react";
import { AccountForm } from "./signup-forms/account-form";
import { ProfileForm } from "./signup-forms/profile-form";

export function SignupForm() {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState<any>(null);

  return (
    <div>
      {step === 1 && (
        <AccountForm
          onNext={(data: any) => {
            setAccountData(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <ProfileForm
          accountData={accountData}
          onBack={() => setStep(1)}
          onComplete={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <div className="text-center text-green-700">
          Signup complete! Redirecting...
        </div>
      )}
    </div>
  );
}
