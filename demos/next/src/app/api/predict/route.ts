import * as runner from "@proompter/runner-flowise";
import { NextResponse } from "next/server";

export async function GET() {
  const chatflows = await runner.getChatflows();
  return NextResponse.json({ chatflows }, { status: 200 });
}