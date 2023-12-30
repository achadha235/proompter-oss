import { Chat } from "@proompter/server-next";
import config from "@/proompter.config";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

async function handler(req: Request, context: any) {
  return await Chat(req, context, config);
}

export { handler as GET, handler as POST };
