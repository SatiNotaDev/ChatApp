import { Chat, Message } from "@/models";

export class ChatController {
    async getUserChats(userId: string) {
        return await Chat.find({ participants: userId })
            .populate('lastMessage')
            .populate('participants')
    }

 async createChat(data: {
    participants: string [],
    type: 'private' | 'group',
    name?: string,
    creatorId: string
 }) {
    return await Chat.create ({
        ...data,
        participants: [...data.participants, data.creatorId]
    })
 }

 async getChatMessages(chatId: string, userId: string) {
    const chat = await Chat.findOne ({
        _id: chatId,
        participants: userId
    })

    if(!chat) throw new Error('Chat not found');
    return await Message.find({chatId})
    .populate('sender')
 }
}

