"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item } from "../ui/item";

export function ProfileForm({ accountData, onBack, onComplete }: any) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
        email: accountData.email,
        password: accountData.password,
        role_id: accountData.roleId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        phone_number: phone,
    }

      const data = await res.json();

      if (!data.success) {
        setMessage(data.message);
      } else {
        return;
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
    setLoading(false);
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSignup}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to register your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <Input
            id="firstName"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="middleName">Middle Name</FieldLabel>
          <Input
            id="middleName"
            type="text"
            required
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
          <Input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
