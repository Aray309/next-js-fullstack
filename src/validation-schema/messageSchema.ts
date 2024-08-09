import { z as ZOD } from "zod";

export const messageSchema = {
  content: ZOD.string()
    .min(10, { message: "Must be atleast 10 character" })
    .max(300, { message: "Content must be no longer than 300" }),
};
