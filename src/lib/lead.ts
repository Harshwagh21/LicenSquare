import { LICENSE_TYPES, US_STATES, type LicenseType, type UsState } from "./constants";

export const REQUIREMENT_MIN = 10;
export const REQUIREMENT_MAX = 1000;

export type LeadInput = {
  fullName: string;
  phone: string;
  email: string;
  licenseType: string;
  licenseTypeOther?: string;
  state: string;
  requirement: string;
};

export type LeadPayload = {
  fullName: string;
  phone: string;
  email: string;
  licenseType: string;
  state: UsState;
  requirement: string;
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
    licenseTypeOther: raw.licenseTypeOther?.trim() ?? "",
    state: raw.state.trim(),
    requirement: raw.requirement.trim(),
  };
}

export function resolveLicenseType(licenseType: string, licenseTypeOther: string): string {
  if (licenseType !== "Other") return licenseType;
  return `Other (${licenseTypeOther})`;
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

  const licenseOther = input.licenseTypeOther ?? "";
  if (input.licenseType === "Other" && licenseOther.length < 2) {
    return {
      ok: false,
      message: "Please specify your license type.",
      field: "licenseTypeOther",
    };
  }

  if (!US_STATES.includes(input.state as UsState)) {
    return { ok: false, message: "Select a U.S. state.", field: "state" };
  }

  const requirementError = validateRequirement(input.requirement);
  if (requirementError) return requirementError;

  return {
    ok: true,
    data: {
      fullName: input.fullName,
      phone: phoneDigits,
      email: input.email,
      licenseType: resolveLicenseType(input.licenseType, licenseOther),
      state: input.state as UsState,
      requirement: input.requirement,
    },
  };
}

function validateRequirement(value: string): LeadValidationResult | null {
  if (value.length < REQUIREMENT_MIN) {
    return {
      ok: false,
      message: "Tell us what you need in a sentence or two.",
      field: "requirement",
    };
  }
  if (value.length > REQUIREMENT_MAX) {
    return {
      ok: false,
      message: "Keep this under 1000 characters.",
      field: "requirement",
    };
  }
  return null;
}
