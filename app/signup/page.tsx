"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { signup } from "./action";
import { useCreateNewAccount } from "@/hooks/applicant/signup/useCreateNewAccount";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";

const initialState = { error: "" };

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { createAccount, loading, error } = useCreateNewAccount();
  const [state, formAction] = useActionState(signup, initialState);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (state?.error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else if (state && state.error === null) {
      router.push("/applicant/jobs");
    }
  }, [state, router]);

  return (
    <>
      {error && (
        <div
          className={`fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-md transition-all duration-300 ease-in-out ${
            showAlert && error
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
          aria-live="assertive"
        >
          <Alert variant="destructive">
            <p>{error}</p>
          </Alert>
        </div>
      )}

      <main className="min-h-dvh flex flex-col items-center justify-center bg-blue-950">
        <div className="w-full max-w-md bg-white shadow-lg shadow-accent-foreground p-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/MMCL_Logo_Horizontal.png"
              alt="Signup Image"
              width={150}
              height={150}
            />
          </div>
          <form action={formAction}>
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
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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
                    name="confirmPassword"
                    placeholder="Enter password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Field>
                <FieldSeparator />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full bg-red-600 hover:bg-red-500"
                >
                  Create Account
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
