import { z as ZOD } from "zod";

export const verifySchema = ZOD.object({
  code: ZOD.string().length(6, "Verification code must be 6 digit"),
});
