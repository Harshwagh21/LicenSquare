"use server";

import { finishLeadSubmit } from "@/lib/save-lead";
import { validateLead, type LeadInput } from "@/lib/lead";
import { after } from "next/server";

export type SubmitLeadState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
};

const SAVED = "Thank you! Our licensing team will reach out within one business day.";
const UNCONFIGURED = "Form storage is not configured yet. Please contact the site administrator.";

export async function submitLead(
  _prev: SubmitLeadState | null,
  formData: FormData,
): Promise<SubmitLeadState> {
  const validation = validateLead(readLead(formData));
  if (!validation.ok) return invalidLead(validation.message, validation.field);

  const saved = await finishLeadSubmit({
    webhookUrl: process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    secret: process.env.GOOGLE_SHEETS_SECRET,
    data: validation.data,
    submittedAt: new Date().toISOString(),
    schedule: (task) => after(task),
  });

  if (!saved.ok) return { ok: false, message: UNCONFIGURED };
  return { ok: true, message: SAVED };
}

function readLead(formData: FormData): LeadInput {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    licenseType: String(formData.get("licenseType") ?? ""),
    licenseTypeOther: String(formData.get("licenseTypeOther") ?? ""),
    state: String(formData.get("state") ?? ""),
  };
}

function invalidLead(message: string, field?: keyof LeadInput): SubmitLeadState {
  return {
    ok: false,
    message,
    fieldErrors: field ? { [field]: message } : undefined,
  };
}
