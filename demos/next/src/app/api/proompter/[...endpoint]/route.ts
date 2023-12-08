import { Chat } from "@proompter/server-next";
import config from "@/proompter.config";

async function handler(req: Request, context: any) {
  return await Chat(req, context, config);
}

export { handler as GET, handler as POST };
