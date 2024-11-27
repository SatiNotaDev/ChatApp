// src/app/(protected)/chats/[chatId]/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from '@/types';

type Theme = 'light' | 'dark' | 'pink';

const themeStyles = {
  light: {
    bg: 'bg-white',
    container: 'bg-gray-100',
    messageMine: 'bg-blue-500 text-white',
    messageOther: 'bg-gray-100 text-gray-900',
    input: 'bg-white',
  },
  dark: {
    bg: 'bg-gray-900',
    container: 'bg-gray-800',
    messageMine: 'bg-blue-600 text-white',
    messageOther: 'bg-gray-700 text-white',
    input: 'bg-gray-800 text-white',
  },
  pink: {
    bg: 'bg-pink-50',
    container: 'bg-white',
    messageMine: 'bg-pink-400 text-white',
    messageOther: 'bg-pink-100 text-gray-900',
    input: 'bg-white',
  }
};

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>('light');

  const styles = themeStyles[theme];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: '2',
        name: 'You'
      },
      timestamp: new Date().toLocaleTimeString(),
      isMine: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className={`flex flex-col h-full ${styles.container}`}>
      {/* Header */}
      <div className={`flex items-center px-6 py-4 border-b ${styles.bg}`}>
        <Avatar>
          <img src="/api/placeholder/40/40" alt="User avatar" />
        </Avatar>
        <div className="ml-4 flex items-center space-x-2">
          <h2 className="font-semibold">Alice Smith</h2>
          {/* Статус пользователя */}
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-500 ml-2">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea 
        ref={scrollAreaRef} 
        className={`flex-1 p-4 space-y-4 ${styles.container}`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isMine
                  ? styles.messageMine
                  : styles.messageOther
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Input */}
      <div className={`p-4 border-t ${styles.bg}`}>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-900"
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className={`flex-1 ${styles.input}`}
          />
          <Button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}