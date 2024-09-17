import { resendEmail } from "@/lib/resendEmail";
import VerificationEmail from "../../../emails/VerifyEmailTemp";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
  message: string
): Promise<ApiResponse> {
  try {
    await resendEmail.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Testing - Verification code",
      react: VerificationEmail({ username, otp: verifyCode, message }),
    });
    return {
      success: true,
      message: "Email verification code send successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Email verification could not send email",
    };
  }
}
