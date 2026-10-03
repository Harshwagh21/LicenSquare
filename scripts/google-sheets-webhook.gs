/**
 * LicenSquare lead form → Google Sheet
 *
 * 1. Create a Sheet with headers in row 1:
 *    Timestamp | Full Name | Phone | Email | License Type | State
 * 2. Extensions → Apps Script → paste this file
 * 3. Set SHEET_SECRET below to a long random string (match GOOGLE_SHEETS_SECRET in .env)
 * 4. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
 * 5. Copy the web app URL into GOOGLE_SHEETS_WEBHOOK_URL
 */

const SHEET_SECRET = "replace-with-a-long-random-secret";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.secret !== SHEET_SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.fullName || "",
      payload.phone || "",
      payload.email || "",
      payload.licenseType || "",
      payload.state || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function jsonResponse(body, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
