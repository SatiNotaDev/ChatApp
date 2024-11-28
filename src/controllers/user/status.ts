import { UserStatus } from '@/models';
import { connectDB } from '@/lib/mongoose';
import type { UserStatus as StatusType } from '@/types';

export class UserStatusController {
  async updateStatus(userId: string, newStatus: StatusType) {
    try {
      await connectDB();
      
      const status = await UserStatus.findOneAndUpdate(
        { userId },
        { 
          status: newStatus,
          lastSeen: new Date()
        },
        { new: true, upsert: true }
      );

      return status;
    } catch (error) {
      throw error;
    }
  }

  async getStatus(userId: string) {
    try {
      await connectDB();
      return await UserStatus.findOne({ userId });
    } catch (error) {
      throw error;
    }
  }
}