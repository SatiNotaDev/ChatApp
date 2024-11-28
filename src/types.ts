// types.ts

import mongoose from 'mongoose';



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

// models type
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