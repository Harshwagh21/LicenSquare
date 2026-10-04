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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LICENSE_TYPES, US_STATES } from "@/lib/constants";
import { formatUsPhone } from "@/lib/lead";
import { Check, Lock } from "lucide-react";
import { useActionState, useEffect, useState, type ReactNode } from "react";

const initialState: SubmitLeadState | null = null;

const triggerClass =
  "form-control h-8 w-full rounded-none px-2.5 shadow-none";

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
              placeholder="Your full name"
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
              placeholder="(555) 014-2290"
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
              placeholder="your.email@xyz.com"
              className="form-control"
              aria-invalid={!!state?.fieldErrors?.email}
            />
          </Field>

          <Field
            id="licenseType"
            label="License type"
            error={state?.fieldErrors?.licenseType}
          >
            <FormSelect
              id="licenseType"
              name="licenseType"
              value={fields.licenseType}
              placeholder="Choose your license"
              invalid={!!state?.fieldErrors?.licenseType}
              onChange={(value) => setField("licenseType", value)}
              items={LICENSE_TYPES}
            />
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
                placeholder="pharmacist, psychologist, etc."
           
                className="form-control"
                aria-invalid={!!state?.fieldErrors?.licenseTypeOther}
              />
            </Field>
          )}

          <Field id="state" label="Target state" error={state?.fieldErrors?.state}>
            <FormSelect
              id="state"
              name="state"
              value={fields.state}
              placeholder="Where you want to practice"
              invalid={!!state?.fieldErrors?.state}
              onChange={(value) => setField("state", value)}
              items={US_STATES}
            />
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

function FormSelect({
  id,
  name,
  value,
  placeholder,
  invalid,
  onChange,
  items,
}: {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  invalid?: boolean;
  onChange: (value: string) => void;
  items: readonly string[];
}) {
  const options = items.map((item) => ({ label: item, value: item }));

  return (
    <Select
      items={options}
      name={name}
      value={value || null}
      onValueChange={(next) => onChange(next ?? "")}
    >
      <SelectTrigger id={id} aria-invalid={invalid} className={triggerClass}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        <SelectGroup>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
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
