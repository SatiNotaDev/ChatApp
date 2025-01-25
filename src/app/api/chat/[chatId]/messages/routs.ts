import { NextResponse } from "next/server";
import { Message } from "@/models";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { chatId: string } }) {
    const userId = await verifyAuth(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
    const messages = await Message.find({ chatId: params.chatId })
      .populate('sender')
      .sort({ createdAt: -1 });
    return NextResponse.json(messages);
  }