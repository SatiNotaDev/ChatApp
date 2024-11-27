import { Card } from "@/components/ui/card";
import {ChatPreview} from '@/types' 

const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: "Alice Smith",
    lastMessage: "Hey, how are you?",
    time: "12:30 PM",
    unread: 2,
  },
  {
    id: '2',
    name: "Bob Johnson",
    lastMessage: "Can you send me the report?",
    time: "11:45 AM",
    unread: 0,
  },

];

export default function ChatsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Chats</h1>
      
      <div className="space-y-3">
        {mockChats.map((chat) => (
          <Card key={chat.id} className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{chat.name}</h3>
                <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{chat.time}</p>
                {chat.unread > 0 && (
                  <span className="inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 mt-1">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}