import { Message } from "@/model/user.model";

export interface ApiResponse {
  status: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>;
}
