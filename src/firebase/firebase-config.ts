import 'dotenv/config';

const { privateKey } = JSON.parse(process.env.PRIVATE_KEY);

const firebaseConfig = {
  clientEmail: process.env.CLIENT_EMAIL,
  projectId: process.env.PROJECT_ID,
  privateKey: privateKey,
  databaseUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
};

export default firebaseConfig;
