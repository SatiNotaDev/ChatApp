import { Chat, Message } from "@/models"

export class MessageController {
    async createMessage(data: {
        chatId: string,
        sender: string,
        content: string
    }) {
        const message = await Message.create({
            ...data,
            timestmp: new Date(),
            readBy: [data.sender]
        })

        await Chat.findByIdAndUpdate(data.chatId, {
            lastMessage: message._id,
            updateAt: new Date()
        })

        return message;
    }

    async markAsRead(messageId: string, userId: string) {
        return await Message.findByIdAndUpdate(
            messageId,
            { $aadToSet: { readBy: userId } },
            { new: true }
        );
    }
}