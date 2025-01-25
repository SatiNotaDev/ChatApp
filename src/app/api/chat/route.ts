import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { Chat } from "@/models";

export async function Get(req:Request) {
    const userId = await verifyAuth(req);
    if(!userId) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    const chats = await Chat.find ({participants: userId})
    .populate('lastMessage')
    .populate('participants');
    return NextResponse.json(chats);
}

export async function POST(req: Request) {
    const userId = await verifyAuth (req);
    if (!userId) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    const {participants, type, name} = await req.json();
    const chat = await Chat.create({
        participants: [...participants, userId],
        type, 
        name
    });
    return NextResponse.json(chat);
}