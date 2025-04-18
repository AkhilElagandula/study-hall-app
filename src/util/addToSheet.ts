import { google } from 'googleapis';
// import { JWT } from 'google-auth-library';
import path from 'path';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = 'your_sheet_id_here'; // From the Google Sheet URL
const SHEET_NAME = 'Sheet1'; // or your tab name

export const appendToGoogleSheet = async (data: {
  name: string;
  gender: string;
  mobile: string;
}) => {
  const keyFile = path.join(process.cwd(), 'credentials.json'); // 🔑 Your service account JSON
  const credentials = JSON.parse(fs.readFileSync(keyFile, 'utf-8'));

  const client = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth: client });

  const values = [[data.name, data.gender, data.mobile]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
};