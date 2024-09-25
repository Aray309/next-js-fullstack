import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin/app";

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY as string);

if (!admin.apps.length) {
  const serviceAccount: ServiceAccount = {
    privateKey,
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (!serviceAccount) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT environment variable is not set."
    );
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT:", error);
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT format.");
  }
}

export default admin;
