"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Alert } from "@/components/ui/alert";

import { login } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  // Function to show error with animation
  const showError = (message: string) => {
    setShowAlert(false);
    setError(message);
    setTimeout(() => setShowAlert(true), 0);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = formData;

    try {
      const result = await login(email, password);
      const { error, role } = result;

      if (error) {
        showError(error);
        return;
      }

      if (role === "hr") {
        router.push("/hr/dashboard");
      } else if (role === "applicant") {
        router.push("/applicant/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        showError("Unknown user role");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      showError(message);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const payload = await res.json();
          const { role } = payload;

          if (role === "hr") {
            router.push("/hr/dashboard");
          } else if (role === "applicant") {
            router.push("/applicant/dashboard");
          } else if (role === "admin") {
            router.push("/admin/dashboard");
          }
        }
      } catch (err) {
        // Not logged in, do nothing
      }
    };

    checkAuth();
  }, [router]);

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
          className="p-8 shadow-md shadow-accent-foreground w-full max-w-md bg-white"
          onSubmit={handleFormSubmit}
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
