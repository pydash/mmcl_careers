"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { signup } from "@/services/signup.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signup(formData.email, formData.password, formData.confirmPassword);
      router.push("/applicant/jobs");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-md transition-all duration-300 ease-in-out translate-y-0 opacity-100">
          <Alert variant="destructive" className="bg-white">
            <p>{error}</p>
          </Alert>
        </div>
      )}

      <main className="min-h-dvh flex flex-col items-center justify-center bg-blue-950">
        <div className="w-full max-w-md bg-white shadow-lg shadow-accent-foreground p-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/MMCL_Logo_Horizontal.png"
              alt="MMCL Logo"
              width={150}
              height={150}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Sign Up</FieldLegend>
                <FieldDescription>
                  Please enter your email to create an account
                </FieldDescription>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="email">Email</Label>
                  </FieldLabel>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isLoading}
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="password">Password</Label>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                  </FieldLabel>
                  <Input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    disabled={isLoading}
                  />
                </Field>

                <FieldSeparator />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full bg-red-600 hover:bg-red-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </FieldSet>

              <Field>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </main>
    </>
  );
}
