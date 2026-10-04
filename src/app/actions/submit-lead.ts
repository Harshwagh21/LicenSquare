"use server";

import { validateLead, type LeadInput } from "@/lib/lead";

export type SubmitLeadState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
};

export async function submitLead(
  _prev: SubmitLeadState | null,
  formData: FormData,
): Promise<SubmitLeadState> {
  const raw: LeadInput = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    licenseType: String(formData.get("licenseType") ?? ""),
    licenseTypeOther: String(formData.get("licenseTypeOther") ?? ""),
    state: String(formData.get("state") ?? ""),
  };

  const validation = validateLead(raw);
  if (!validation.ok) {
    return {
      ok: false,
      message: validation.message,
      fieldErrors: validation.field
        ? { [validation.field]: validation.message }
        : undefined,
    };
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;

  if (!webhookUrl || !secret) {
    return {
      ok: false,
      message:
        "Form storage is not configured yet. Please contact the site administrator.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        ...validation.data,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        message: "We could not save your request. Please try again shortly.",
      };
    }

    return {
      ok: true,
      message: "Thank you! Our licensing team will reach out within one business day.",
    };
  } catch {
    return {
      ok: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
