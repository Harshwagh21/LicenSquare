import { describe, expect, it, vi } from "vitest";
import { finishLeadSubmit, type LeadSaveInput } from "./save-lead";

const lead: LeadSaveInput = {
  webhookUrl: "https://example.com/exec",
  secret: "secret",
  data: {
    fullName: "Jane Doe",
    phone: "5551234567",
    email: "jane@example.com",
    licenseType: "MD",
    state: "California",
    requirement: "New California license before July.",
  },
  submittedAt: "2026-10-04T12:00:00.000Z",
  schedule: () => {},
};

describe("finishLeadSubmit", () => {
  it("returns success without waiting for the sheet write", async () => {
    let fetched = false;
    const fetchImpl = vi.fn(() => {
      fetched = true;
      return new Promise<Response>(() => {});
    });

    const result = await finishLeadSubmit({
      ...lead,
      fetchImpl: fetchImpl as unknown as typeof fetch,
      schedule: (task) => {
        void task();
      },
    });

    expect(result).toEqual({ ok: true });
    expect(fetched).toBe(true);
  });

  it("does not queue a save when storage is missing", async () => {
    const schedule = vi.fn();
    const result = await finishLeadSubmit({
      ...lead,
      webhookUrl: undefined,
      schedule,
    });

    expect(result).toEqual({ ok: false, reason: "unconfigured" });
    expect(schedule).not.toHaveBeenCalled();
  });
});
