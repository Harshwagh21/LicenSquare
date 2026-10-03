import { LICENSE_TYPES, US_STATES, type LicenseType, type UsState } from "./constants";

export type LeadInput = {
  fullName: string;
  phone: string;
  email: string;
  licenseType: string;
  state: string;
};

export type LeadPayload = {
  fullName: string;
  phone: string;
  email: string;
  licenseType: LicenseType;
  state: UsState;
};

export type LeadValidationResult =
  | { ok: true; data: LeadPayload }
  | { ok: false; message: string; field?: keyof LeadInput };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseLeadInput(raw: LeadInput): LeadInput {
  return {
    fullName: raw.fullName.trim(),
    phone: raw.phone.trim(),
    email: raw.email.trim().toLowerCase(),
    licenseType: raw.licenseType.trim(),
    state: raw.state.trim(),
  };
}

export function digitsOnlyPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function formatUsPhone(value: string): string {
  const digits = digitsOnlyPhone(value).slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function validateLead(raw: LeadInput): LeadValidationResult {
  const input = parseLeadInput(raw);

  if (input.fullName.length < 2) {
    return { ok: false, message: "Please enter your full name.", field: "fullName" };
  }

  const phoneDigits = digitsOnlyPhone(input.phone);
  if (phoneDigits.length !== 10) {
    return {
      ok: false,
      message: "Enter a valid 10-digit U.S. phone number.",
      field: "phone",
    };
  }

  if (!EMAIL_PATTERN.test(input.email)) {
    return { ok: false, message: "Enter a valid email address.", field: "email" };
  }

  if (!LICENSE_TYPES.includes(input.licenseType as LicenseType)) {
    return { ok: false, message: "Select a license type.", field: "licenseType" };
  }

  if (!US_STATES.includes(input.state as UsState)) {
    return { ok: false, message: "Select a U.S. state.", field: "state" };
  }

  return {
    ok: true,
    data: {
      fullName: input.fullName,
      phone: formatUsPhone(phoneDigits),
      email: input.email,
      licenseType: input.licenseType as LicenseType,
      state: input.state as UsState,
    },
  };
}
