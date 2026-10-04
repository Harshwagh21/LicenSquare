"use client";

import { submitLead, type SubmitLeadState } from "@/app/actions/submit-lead";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LICENSE_TYPES, US_STATES } from "@/lib/constants";
import { formatUsPhone } from "@/lib/lead";
import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";
import { useActionState, useEffect, useState, type ReactNode } from "react";

const initialState: SubmitLeadState | null = null;

const selectClass =
  "form-control h-8 w-full min-w-0 px-2.5 py-1 text-sm transition-colors outline-none";

type FormFields = {
  fullName: string;
  phone: string;
  email: string;
  licenseType: string;
  licenseTypeOther: string;
  state: string;
};

const emptyFields: FormFields = {
  fullName: "",
  phone: "",
  email: "",
  licenseType: "",
  licenseTypeOther: "",
  state: "",
};

const cardClass =
  "brutal-frame rounded-none border border-border bg-card text-card-foreground shadow-none dark:bg-card dark:border-input";

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [fields, setFields] = useState<FormFields>(emptyFields);

  useEffect(() => {
    if (state?.ok) setFields(emptyFields);
  }, [state?.ok]);

  const setField = (key: keyof FormFields, value: string) => {
    setFields((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "licenseType" && value !== "Other") {
        next.licenseTypeOther = "";
      }
      return next;
    });
  };

  if (state?.ok) {
    return (
      <Card className={cardClass}>
        <CardContent className="flex flex-col items-center px-6 py-12 text-center">
          <span className="mb-4 flex size-12 items-center justify-center border border-border bg-brand-sky/15 text-brand-sky dark:border-input">
            <Check className="size-5" strokeWidth={2.5} />
          </span>
          <CardTitle className="font-heading text-lg">Request received</CardTitle>
          <CardDescription className="mt-2 max-w-xs text-xs leading-relaxed">
            {state.message}
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cardClass}>
      <CardHeader className="border-b border-border px-4 py-3 sm:px-5 dark:border-input">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-sky">
          Start your application
        </p>
        <CardTitle className="font-heading text-xl font-extrabold tracking-tight">
          Get started
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed text-muted-foreground">
          Share your details, our licensing team responds within one business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-4 sm:px-5">
        <form action={formAction} className="space-y-3" noValidate>
          <Field
            id="fullName"
            label="Full name"
            error={state?.fieldErrors?.fullName}
          >
            <Input
              id="fullName"
              name="fullName"
              value={fields.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              autoComplete="name"
              placeholder="Dr. Jane Doe"
              className="form-control"
              aria-invalid={!!state?.fieldErrors?.fullName}
            />
          </Field>

          <Field id="phone" label="Phone" error={state?.fieldErrors?.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={fields.phone}
              onChange={(e) => setField("phone", formatUsPhone(e.target.value))}
              autoComplete="tel"
              placeholder="(555) 123-4567"
              className="form-control"
              aria-invalid={!!state?.fieldErrors?.phone}
            />
          </Field>

          <Field id="email" label="Email" error={state?.fieldErrors?.email}>
            <Input
              id="email"
              name="email"
              type="email"
              value={fields.email}
              onChange={(e) => setField("email", e.target.value)}
              autoComplete="email"
              placeholder="you@clinic.com"
              className="form-control"
              aria-invalid={!!state?.fieldErrors?.email}
            />
          </Field>

          <Field
            id="licenseType"
            label="License type"
            error={state?.fieldErrors?.licenseType}
          >
            <select
              id="licenseType"
              name="licenseType"
              value={fields.licenseType}
              onChange={(e) => setField("licenseType", e.target.value)}
              className={cn(
                selectClass,
                !fields.licenseType && "text-muted-foreground",
              )}
              aria-invalid={!!state?.fieldErrors?.licenseType}
            >
              <option value="" disabled>
                Select type
              </option>
              {LICENSE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          {fields.licenseType === "Other" && (
            <Field
              id="licenseTypeOther"
              label="Specify license"
              error={state?.fieldErrors?.licenseTypeOther}
            >
              <Input
                id="licenseTypeOther"
                name="licenseTypeOther"
                value={fields.licenseTypeOther}
                onChange={(e) => setField("licenseTypeOther", e.target.value)}
                placeholder="e.g. Podiatrist, Pharmacist"
                className="form-control"
                aria-invalid={!!state?.fieldErrors?.licenseTypeOther}
              />
            </Field>
          )}

          <Field id="state" label="Target state" error={state?.fieldErrors?.state}>
            <select
              id="state"
              name="state"
              value={fields.state}
              onChange={(e) => setField("state", e.target.value)}
              className={cn(selectClass, !fields.state && "text-muted-foreground")}
              aria-invalid={!!state?.fieldErrors?.state}
            >
              <option value="" disabled>
                Select state
              </option>
              {US_STATES.map((usState) => (
                <option key={usState} value={usState}>
                  {usState}
                </option>
              ))}
            </select>
          </Field>

          {state && !state.ok && !state.fieldErrors && (
            <p className="border border-destructive/40 bg-destructive/10 px-2.5 py-2 text-xs text-destructive">
              {state.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="mt-1 h-9 w-full rounded-none font-semibold uppercase tracking-wide"
          >
            {pending ? "Submitting…" : "Submit request"}
          </Button>

          <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-muted-foreground">
            <Lock className="size-3 shrink-0" aria-hidden />
            Your information is safe with us. We respect your privacy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-wide text-foreground"
      >
        {label} <span className="text-destructive">*</span>
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[11px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
