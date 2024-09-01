import { z } from "zod";
//Define validation schema using ZOD
const SignupSchema = z
  .object({
    username: z.string().min(1, "Name is required"),
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(6, "password should minimum 6 character"),
    rePassword: z.string().min(6, "password should minimum 6 character"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
// Type definitions
export type SignupData = z.infer<typeof SignupSchema>;
export type SignupErrors = Partial<Record<keyof SignupData, string>>;

export default SignupSchema;
