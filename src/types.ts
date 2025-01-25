import React from 'react';
import mongoose from 'mongoose';


export interface AnimatedContentProps {
    children: React.ReactNode;
    isLogin: boolean;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
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
  _id: string; 
  name: string;
  department: string;
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


export type UserStatusType = 'online' | 'offline' | 'busy' | 'vacation';
export type ThemeType = 'light' | 'dark' | 'pink';
export type FontSize = 'normal' | 'large' | 'larger';

export interface IUser {
  name: string;
  email: string;
  password: string;
  department: string;
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
}

export interface IUserStatus extends Document {
  userId: mongoose.Types.ObjectId;
  status: UserStatusType;
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
    department: string;
  }

export  interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) => Promise<void>;
  }
  
export interface RegisterFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => Promise<void>;
}

export interface UserData {
  name: string;
  status: 'online' | 'offline' | 'busy' | 'vacation';
}

export interface Settings {
  theme: 'light' | 'dark' | 'pink';
  fontSize: 'normal' | 'large' | 'larger';
  sound: boolean;
  notifications: boolean;
 }

 export interface UserData {
  name: string;
  email: string;
  status: 'online' | 'offline' | 'busy' | 'vacation';
  theme?: 'light' | 'dark' | 'pink';
  fontSize?: 'normal' | 'large' | 'larger';
  sound?: boolean;
  notifications?: boolean;
}


export interface IContact extends Document {
  name: string;
  email: string;
  department: string;
  createdAt: Date;
}
