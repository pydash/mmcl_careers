"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { login } from "./action";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Alert } from "@/components/ui/alert";

const initialState = { error: "" };

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [state, formAction] = useActionState(login, initialState);

  const showError = (message: string) => {
    // Mount hidden first, then trigger show to animate in
    setShowAlert(false);
    setError(message);
    setTimeout(() => setShowAlert(true), 0);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (state?.error) {
      showError(state.error);
    } else if (state && state.error === null) {
      router.push("/applicant/dashboard");
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

      <main className="h-dvh flex flex-col items-center justify-center gap-4">
        <form
          className=" p-6 rounded-2xl shadow-md w-full max-w-md"
          action={formAction}
        >
          <div className="flex justify-center">
            <Image
              src="/MMCL_Logo_Horizontal.png"
              alt="Signup Image"
              width={150}
              height={150}
            />
          </div>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Log in</FieldLegend>
              <FieldDescription>
                Please enter your email and password to log in
              </FieldDescription>
              <Field>
                <FieldLabel>
                  <Label htmlFor="email">Email</Label>
                </FieldLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
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
                    onClick={toggleShowPassword}
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
                <Link
                  href="./forgot-password"
                  className="text-blue-600 hover:underline text-sm mt-2 block text-right"
                >
                  Forgot password?
                </Link>
              </Field>
              <FieldSeparator />
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
              >
                Log in
              </Button>
            </FieldSet>
            <Field>
              <FieldDescription className="text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </main>
    </>
  );
}
