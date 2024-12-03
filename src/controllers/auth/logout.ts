import { User, UserStatus } from '@/models';
import { connectDB } from '@/lib/mongoose';

export class LogoutController {
  async logout(userId: string) {
    try {
      await connectDB();

      // Обновляем статус пользователя на offline
      await UserStatus.findOneAndUpdate(
        { userId },
        { 
          status: 'offline',
          lastSeen: new Date()
        },
        { upsert: true }
      );

      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  }
}