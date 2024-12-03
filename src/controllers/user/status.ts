import { UserStatus } from '@/models';
import { connectDB } from '@/lib/mongoose';
import type { UserStatusType } from '@/models/UserStatus';

export class UserStatusController {
  async setStatus(userId: string, status: UserStatusType) {
    try {
      await connectDB();
      const isTemporary = status !== 'vacation';

      const updatedStatus = await UserStatus.findOneAndUpdate(
        { userId },
        { 
          status,
          isTemporary,
          lastSeen: new Date()
        },
        { upsert: true, new: true }
      );

      return updatedStatus;
    } catch (error) {
      console.error('Set status error:', error);
      throw error;
    }
  }

  async getStatus(userId: string) {
    try {
      await connectDB();
      const status = await UserStatus.findOne({ userId });
      return status || { status: 'offline', isTemporary: true };
    } catch (error) {
      console.error('Get status error:', error);
      throw error;
    }
  }

  async handleLogin(userId: string) {
    try {
      await connectDB();
      const currentStatus = await UserStatus.findOne({ userId });
      if (currentStatus?.status === 'vacation' && !currentStatus.isTemporary) {
        return currentStatus;
      }
      return await this.setStatus(userId, 'online');
    } catch (error) {
      console.error('Handle login error:', error);
      throw error;
    }
  }

  async handleLogout(userId: string) {
    try {
      await connectDB();
      const currentStatus = await UserStatus.findOne({ userId })
      if (currentStatus?.status === 'vacation' && !currentStatus.isTemporary) {
        return currentStatus;
      }
      return await this.setStatus(userId, 'offline');
    } catch (error) {
      console.error('Handle logout error:', error);
      throw error;
    }
  }
}