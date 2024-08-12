import { z as ZOD } from "zod";

export const usernameValidation = ZOD.string()
  .min(5, "Username must be atleast 2 character")
  .max(20, "Username must not be more than 20 character")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username should not contain special character except _"
  );

export const signUpSchema = ZOD.object({
  username: usernameValidation,
  email: ZOD.string()
    .min(4, "Invalid")
    .email({ message: "Invalid email address" }),
  password: ZOD.string().min(6, { message: "Password must be 6 character" }),
});
