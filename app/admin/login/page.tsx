"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { login } from "./action";
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
      router.push("/admin/dashboard");
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
          <Alert variant="destructive" className="bg-white">
            <p>{error}</p>
          </Alert>
        </div>
      )}
      <main className="h-dvh flex flex-col items-center justify-center bg-blue-950">
        <form
          className="w-full max-w-md bg-white p-8 shadow-md shadow-accent-foreground"
          action={formAction}
        >
          <div className="flex justify-center">
            <Image
              src="/MMCL_Logo_Horizontal.png"
              alt="MMCL Logo"
              width={150}
              height={150}
            />
          </div>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Admin Log in</FieldLegend>
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
                  value={formData.email ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
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
                    value={formData.password ?? ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
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
              </Field>
              <FieldSeparator />
              <Button
                type="submit"
                variant="default"
                className="w-full bg-red-600 hover:bg-red-500"
              >
                Log In
              </Button>
            </FieldSet>
          </FieldGroup>
        </form>
      </main>
    </>
  );
}
