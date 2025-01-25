import { WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';
import { IncomingMessage } from 'http';
import { verifyToken, extractToken } from './auth';
import { parse } from 'url';
import { Chat, Message } from '../models';


interface WebSocketClient extends WebSocket {
 userId?: string;   
 isAlive?: boolean;  
}

interface ChatMessage {
 type: 'message' | 'typing' | 'read'; 
 chatId: string; 
 content?: string;  
 sender?: string;  
 timestamp?: string; 
}

async function saveMessageToDb(message: ChatMessage, senderId: string) {
 try {
   const newMessage = await Message.create({
     chatId: message.chatId,
     sender: senderId,
     content: message.content,
     timestamp: new Date(),
     readBy: [senderId] 
   });


   await Chat.findByIdAndUpdate(message.chatId, {
     lastMessage: newMessage._id,
     updatedAt: new Date()
   });

   return newMessage;
 } catch (error) {
   console.error('Error saving message:', error);
   throw error;
 }
}

export function setupWebSocket(server: HTTPServer) {
 const wss = new WebSocketServer({ server }); 
 const clients = new Map<string, WebSocketClient>(); 

 
 wss.on('connection', async (ws: WebSocketClient, request) => {
   try {
    
     let token: string | null = null;
     
     if (request.url) {
       const { query } = parse(request.url, true);
       token = query.token as string;
     }

     if (!token && request.headers.cookie) {
       token = extractToken(request.headers.cookie);
     }

     if (!token) {
       ws.close();
       return;
     }

     const userId = await verifyToken(token);
     if (!userId) {
       ws.close();
       return;
     }

     ws.userId = userId;
     ws.isAlive = true;
     clients.set(userId, ws);

     ws.on('pong', () => {
       if (ws.isAlive !== undefined) {
         ws.isAlive = true;
       }
     });


     ws.on('message', async (data) => {
       try {
         const message: ChatMessage = JSON.parse(data.toString());
         const chat = await Chat.findById(message.chatId)
           .populate('participants');

         if (!chat) {
           console.error('Chat not found:', message.chatId);
           return;
         }

         switch (message.type) {
           case 'message':
             if (message.content) {
               const savedMessage = await saveMessageToDb(message, ws.userId!);
               chat.participants.forEach((participant: { _id: string }) => {
                 const client = clients.get(participant._id.toString());
                 if (client && client.readyState === WebSocket.OPEN) {
                   client.send(JSON.stringify({
                     ...message,
                     id: savedMessage._id,
                     sender: ws.userId,
                     timestamp: savedMessage.timestamp
                   }));
                 }
               });
             }
             break;

           case 'typing':
             chat.participants.forEach((participant: { _id: string }) => {
               if (participant._id.toString() !== ws.userId) {
                 const client = clients.get(participant._id.toString());
                 if (client && client.readyState === WebSocket.OPEN) {
                   client.send(JSON.stringify({
                     type: 'typing',
                     chatId: message.chatId,
                     sender: ws.userId
                   }));
                 }
               }
             });
             break;

           case 'read':
             await Message.updateMany(
               { 
                 chatId: message.chatId,
                 readBy: { $ne: ws.userId }
               },
               { 
                 $addToSet: { readBy: ws.userId }
               }
             );
             chat.participants.forEach((participant: { _id: string }) => {
               const client = clients.get(participant._id.toString());
               if (client && client.readyState === WebSocket.OPEN) {
                 client.send(JSON.stringify({
                   type: 'read',
                   chatId: message.chatId,
                   sender: ws.userId
                 }));
               }
             });
             break;
         }
       } catch (error) {
         console.error('Message handling error:', error);
       }
     });
     ws.on('close', () => {
       clients.delete(userId);
     });

   } catch (error) {
     console.error('WebSocket connection error:', error);
     ws.close();
   }
 });
 const interval = setInterval(() => {
   wss.clients.forEach((ws: WebSocketClient) => {
     if (!ws.isAlive) {
       clients.delete(ws.userId!);
       return ws.terminate();
     }
     ws.isAlive = false;
     ws.ping();
   });
 }, 30000); 

 wss.on('close', () => {
   clearInterval(interval);
 });

 return { wss, clients };
}