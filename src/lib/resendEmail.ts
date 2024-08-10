import { Resend } from "resend";

export const resendEmail = new Resend(process.env.RESEND_EMAIL);
