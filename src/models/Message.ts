import mongoose from "mongoose";

const messageSchema = new mongoose.Schema ( {
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'file'],
        default: 'text'
    },
    fileUrl: String,
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    createAt: {
        type: Date,
        default: Date.now
    }
});

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)