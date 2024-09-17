import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/verification/sendVerificationEmail";
import { otpGenerator as OtpGenerator } from "@/helpers/verification/otpGenerater";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    //Finding user from database using username and isVerified status
    const exstingUsrNm = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (exstingUsrNm) {
      //409: conflict
      return Response.json(
        { success: false, message: "User already register" },
        { status: 409 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = OtpGenerator();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 409 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        //Updating the field
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      //When user is registering first time
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        verifyCode,
        password: hashedPassword,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }
    // Send verification email
    const emailMesage =
      "Thank you for registering. Please use the following verificationcode to complete your registration";
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode,
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
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    //Below error will display on console
    console.log("An error occured", error);
    //This is use to send on frontend app.
    return Response.json(
      {
        status: false,
        message: "An error occured while regitering user",
      },
      { status: 500 }
    );
  }
}
