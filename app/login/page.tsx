"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { login } from "@/services/login.service";
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
  FieldSet,
  FieldSeparator,
} from "@/components/ui/field";

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
        });

        if (response.ok) {
          router.replace("/applicant/dashboard");
        }
      } catch {
        // Ignore session check errors; show login page
      }
    };

    checkSession();
  }, [router]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      // Redirect based on user role
      if (result.role === "hr") {
        router.push("/hr/dashboard");
      } else if (result.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/applicant/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-md">
          <Alert variant="destructive" className="bg-white">
            <p>{error}</p>
          </Alert>
        </div>
      )}

      <main className="h-dvh flex flex-col items-center justify-center bg-blue-950">
        <form
          className="p-8 shadow-md shadow-accent-foreground w-full max-w-md bg-white"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-6">
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
                  placeholder="you@example.com"
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

              <FieldSeparator />
              <Button
                type="submit"
                variant="default"
                className="w-full bg-red-600 hover:bg-red-500"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
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
