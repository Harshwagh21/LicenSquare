# LicenSquare

Professional landing page for medical licensing lead capture (Next.js App Router).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Sheets (form submissions)

1. Create a Google Sheet with headers: `Timestamp`, `Full Name`, `Phone`, `Email`, `License Type`, `State`.
2. Copy [scripts/google-sheets-webhook.gs](scripts/google-sheets-webhook.gs) into **Extensions → Apps Script**.
3. Set `SHEET_SECRET` in the script and deploy as a **Web app** (Anyone can access).
4. Copy `.env.example` to `.env.local` and set `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_SECRET`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run test` — validation unit tests

Local reference mockups live in `images/` (gitignored).
