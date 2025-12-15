"use client";

import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function CompleteProfilePage({ searchParams }: any) {
  const accountId = searchParams.uid;

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/complete-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: accountId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        phone_number: phone,
      }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/login";
    } else {
      setMessage(data.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Complete Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Middle Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>

      {message && <p className="mt-3 text-red-600 text-sm">{message}</p>}
    </div>
  );
}
