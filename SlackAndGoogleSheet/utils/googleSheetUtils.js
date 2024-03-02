const { google } = require('googleapis');

async function googleSheetAppend(data) {
    const { activity, selectedActivity, activityDatePicker, activityHours } = data;

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1j0bw2_Tbxp9Mc6YkUDuYHuB3VQ3HT02JwW1P54POQDw";

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:D",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[activity, selectedActivity, activityDatePicker, activityHours]],
        },
    });
}

module.exports = {
    googleSheetAppend
};