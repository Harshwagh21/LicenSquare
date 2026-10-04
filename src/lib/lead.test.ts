import { describe, expect, it } from "vitest";
import { parseLeadInput, validateLead } from "./lead";

const validLead = {
  fullName: "Jane Doe",
  phone: "(555) 123-4567",
  email: "jane@example.com",
  licenseType: "MD",
  state: "California",
};

describe("validateLead", () => {
  it("accepts a complete valid lead", () => {
    const result = validateLead(validLead);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.email).toBe("jane@example.com");
    }
  });

  it("stores the phone as 10 digits for the sheet", () => {
    const result = validateLead(validLead);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.phone).toBe("5551234567");
    }
  });

  it("rejects empty full name", () => {
    const result = validateLead({ ...validLead, fullName: "  " });
    expect(result.ok).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = validateLead({ ...validLead, email: "not-an-email" });
    expect(result.ok).toBe(false);
  });

  it("rejects phone with too few digits", () => {
    const result = validateLead({ ...validLead, phone: "555-1234" });
    expect(result.ok).toBe(false);
  });

  it("rejects unknown license type", () => {
    const result = validateLead({ ...validLead, licenseType: "PhD" });
    expect(result.ok).toBe(false);
  });

  it("rejects unknown state", () => {
    const result = validateLead({ ...validLead, state: "Narnia" });
    expect(result.ok).toBe(false);
  });

  it("requires details when license type is Other", () => {
    const result = validateLead({
      ...validLead,
      licenseType: "Other",
      licenseTypeOther: "",
    });
    expect(result.ok).toBe(false);
  });

  it("accepts Other with a custom license label", () => {
    const result = validateLead({
      ...validLead,
      licenseType: "Other",
      licenseTypeOther: "Podiatrist",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.licenseType).toBe("Other (Podiatrist)");
    }
  });
});

describe("parseLeadInput", () => {
  it("trims string fields", () => {
    const parsed = parseLeadInput({
      fullName: "  Jane Doe  ",
      phone: "5551234567",
      email: " JANE@EXAMPLE.COM ",
      licenseType: "MD",
      state: "Texas",
    });
    expect(parsed.fullName).toBe("Jane Doe");
    expect(parsed.email).toBe("jane@example.com");
  });
});
