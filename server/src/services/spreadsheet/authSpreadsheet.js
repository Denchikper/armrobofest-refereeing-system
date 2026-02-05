const { JWT } = require('google-auth-library');

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountEmail || !serviceAccountKey) {
  throw new Error('Отсутствуют переменные окружения GOOGLE_SERVICE_ACCOUNT_EMAIL или GOOGLE_SERVICE_ACCOUNT_KEY');
}

const jwtSpreadsheet = new JWT({
  email: serviceAccountEmail,
  key: serviceAccountKey,
  scopes: SCOPES,
});

module.exports = jwtSpreadsheet;