// types.ts

import React from 'react';
import mongoose from 'mongoose';

// Типы для компонентов
export interface AnimatedContentProps {
    children: React.ReactNode;
    isLogin: boolean;
}

// Если у вас есть пропсы для AuthForm
export interface AuthFormProps {
    // Добавьте здесь поля, если необходимо
}

// Типы для моделей (если используете TypeScript на сервере)
export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface IChat {
    participants: string[]; // или ObjectId[], если используете Mongoose
    messages: string[];     // или ObjectId[]
}

export interface IMessage {
    sender: string;   // или ObjectId
    content: string;
    chat: string;     // или ObjectId
    timestamp: Date;
}

export interface ChatPreview {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
}

export interface Message {
    id: string;
    content: string;
    sender: {
        id: string;
        name: string;
    };
    timestamp: string;
    isMine: boolean;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    isContact: boolean;
}

export interface ContactCardProps {
    contact: Contact;
    onAction: (contact: Contact) => void;
}

export interface ContactListProps {
    contacts: Contact[];
    onContactAction: (contact: Contact) => void;
    emptyMessage?: string;
}

export interface SearchResult {
    id: string;
    chatName: string;
    messageContent: string;
    timestamp: string;
    matchCount: number;
}  

// src/types/user.types.ts
export type UserStatus = 'online' | 'offline' | 'busy' | 'vacation';
export type ThemeType = 'light' | 'dark' | 'pink';
export type FontSize = 'normal' | 'large' | 'larger';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserStatus extends Document {
  userId: mongoose.Types.ObjectId;
  status: UserStatus;
  lastSeen: Date;
}

export interface IUserSettings extends Document {
  userId: mongoose.Types.ObjectId;
  theme: ThemeType;
  fontSize: FontSize;
  notifications: boolean;
  sound: boolean;
}

export interface Mongoose {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }
  
export interface LoginData {
    email: string;
    password: string;
  }
  
export interface RegisterData extends LoginData {
    name: string;
  }

export  interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) => Promise<void>;
  }
  
export interface RegisterFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => Promise<void>;
}