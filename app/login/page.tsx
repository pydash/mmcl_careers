"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 flex items-center">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 border border-gray-200 bg-white shadow-sm">
        {/* Left Section */}
        <div className="bg-blue-950 p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white">
              Welcome Back
            </p>

            <h1 className="mt-4 text-3xl lg:text-4xl font-bold leading-tight text-white">
              Login to Continue Your Journey
            </h1>

            <p className="mt-5 text-white leading-7 text-base">
              Access your account to explore job listings, track applications,
              and manage your profile all in one place.
            </p>
          </div>

          <div className="mt-10 border-t border-white pt-5">
            <p className="text-white text-sm">Don’t have an account?</p>

            <Link
              href="/register"
              className="inline-flex mt-3 bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-sm font-medium transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8">
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Login Form
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Sign In to Your Account
            </h2>

            <form className="mt-6 space-y-4" onSubmit={login}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-950"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-950"
                />

                <div className="mt-2 text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-950 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
