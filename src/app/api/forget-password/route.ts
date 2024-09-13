import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs"; // For hashing passwords

// Helper function to hash the password
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, newPassword } = await request.json();
    if (newPassword.length < 6) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "The length of password should be more than 6 character",
        }),
        { status: 400 }
      );
    }
    if (!email || !newPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and new password are required",
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

    // Hash the new password before saving
    user.password = await hashPassword(newPassword);
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Password updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("An error occurred while updating the password:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error while updating the password",
      }),
      { status: 500 }
    );
  }
}
