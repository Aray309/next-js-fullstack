import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    //provide the proper user name sometime when the user send via url then % auutomaticallyinserted
    const properUser = decodeURIComponent(username);

    const searchUsername = await UserModel.findOne({ username: properUser });
    if (!searchUsername) {
      return Response.json(
        {
          success: false,
          message: "User does not exist",
        },
        { status: 404 }
      );
    }
    //Check code is correct and not expired
    const isVerified = searchUsername?.verifyCode === code;
    const expiryCodeStatus =
      new Date(searchUsername?.verifyCodeExpiry) > new Date();
    if (isVerified && expiryCodeStatus) {
      searchUsername.isVerified = true;
      await searchUsername.save();
    } else if (!isVerified) {
      return Response.json(
        {
          success: false,
          message: "The verification code is incorrect",
        },
        { status: 403 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "OTP has expired, Please signup again",
        },
        { status: 410 }
      );
    }
  } catch (error) {
    console.log("An eror occured while verification");
    return Response.json(
      {
        success: false,
        message: "Experiencing error while verfication",
      },
      { status: 502 }
    );
  }
}
