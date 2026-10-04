import type { LeadPayload } from "./lead";

export type LeadSaveInput = {
  webhookUrl?: string;
  secret?: string;
  data: LeadPayload;
  submittedAt: string;
  schedule: (task: () => Promise<void>) => void;
  fetchImpl?: typeof fetch;
};

type SaveBody = LeadPayload & { secret: string; submittedAt: string };

export async function finishLeadSubmit(input: LeadSaveInput) {
  const { webhookUrl, secret } = input;
  if (!webhookUrl || !secret) return { ok: false as const, reason: "unconfigured" as const };

  const body: SaveBody = { secret, ...input.data, submittedAt: input.submittedAt };
  input.schedule(() => postLead(webhookUrl, body, input.fetchImpl ?? fetch));
  return { ok: true as const };
}

async function postLead(webhookUrl: string, body: SaveBody, fetchImpl: typeof fetch) {
  try {
    const response = await fetchImpl(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) console.error("Lead sheet save failed", response.status);
  } catch (error) {
    console.error("Lead sheet save failed", error);
  }
}
