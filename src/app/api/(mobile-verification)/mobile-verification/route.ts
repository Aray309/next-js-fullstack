import UserModel from "@/model/user.model"; // Adjust the path as necessary
import admin from "@/lib/firebaseAdmin";
import dbConnect from "@/lib/dbConnect";
import { otpGenerator } from "@/helpers/verification/otpGenerater";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();
  const { mobilePhone, email } = await request.json();

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
  // Check if the user exists; if not, create a new user
  // let user = await UserModel.findOne({ mobilePhone });

  // if (!user) {
  //   user = new UserModel({ mobilePhone });
  // }

  // Generate a verification code (OTP)
  const verificationCode = otpGenerator();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
  // Store the verification code and expiry in the user document
  user.mobilePhone = mobilePhone;
  user.isMobileVerified = false;
  user.mobileVerificationCode = verificationCode;
  user.mobileCodeExpiry = new Date(expiry); // Set expiry as a Date object
  await user.save(); // Save the user document

  // Send OTP via Firebase
  const message = {
    notification: {
      title: "QAangel app verification",
      body: `Your verification code is ${verificationCode}`,
    },
    data: {
      verificationCode, // Optionally include OTP in the data payload
    },
    token: mobilePhone, // Use the mobile number as the recipient (if applicable)
  };

  try {
    // Send the message
    await admin.messaging().send(message);
    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error while sending OTP" }),
      { status: 500 }
    );
  }
}
