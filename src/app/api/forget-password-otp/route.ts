import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { otpGenerator } from "@/helpers/verification/otpGenerater";
import { sendVerificationEmail } from "@/helpers/verification/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email is required",
        }),
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: decodeURIComponent(email) });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User does not exist" }),
        { status: 404 }
      );
    }

    // Generate OTP and set expiration time (e.g., 10 minutes)
    const otp = otpGenerator(); // 6-digit OTP
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    user.resetVerifyCode = otp;
    user.resetVerifyCodeExpiration = otpExpiration;
    await user.save();

    // Send verification email
    const emailMesage = "We are here to help you in resetting password";
    const emailResponse = await sendVerificationEmail(
      email,
      user.username,
      otp,
      emailMesage
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Verification code send successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error while sending verifiaction code",
      }),
      { status: 500 }
    );
  }
}
