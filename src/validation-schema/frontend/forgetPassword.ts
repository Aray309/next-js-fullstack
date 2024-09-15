import { z } from "zod";
//Define validation schema using ZOD
const ForgetPasswordSchema = z
  .object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    newPassword: z.string().min(6, "password should minimum 6 character"),
    newRePassword: z.string().min(6, "password should minimum 6 character"),
  })
  .refine((data) => data.newPassword === data.newRePassword, {
    message: "Passwords do not match",
    path: ["newRePassword"],
  });
// Type definitions
export type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;
export type ForgetPaswordErrors = Partial<
  Record<keyof ForgetPasswordData, string>
>;

export default ForgetPasswordSchema;
