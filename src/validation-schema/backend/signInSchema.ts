import { z as ZOD } from "zod";

export const signInSchema = ZOD.object({
  identifier: ZOD.string(),
  password: ZOD.string().length(6, "Must conatin 6 character"),
});
