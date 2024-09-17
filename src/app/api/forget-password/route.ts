import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, otp, newPassword } = await request.json();
    if (!email || !otp || !newPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email, OTP, and new password are required",
        }),
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({
      email,
      resetVerifyCode: otp,
      resetVerifyCodeExpiration: { $gt: Date.now() }, // Check if OTP is not expired
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or expired OTP" }),
        { status: 400 }
      );
    }

    // Hash the new password and update user
    user.password = await hashPassword(newPassword);
    user.resetVerifyCode = "";
    user.resetVerifyCodeExpiration = new Date();
    await user.save();

    return new Response(
      JSON.stringify({ success: true, message: "Password reset successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password with OTP:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error resetting password" }),
      { status: 500 }
    );
  }
}
