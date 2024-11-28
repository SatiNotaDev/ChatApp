import { UserSettings } from '@/models';
import { connectDB } from '@/lib/mongoose';
import type { IUserSettings } from '@/types';

export class UserSettingsController {
  async updateSettings(userId: string, newSettings: Partial<IUserSettings>) {
    try {
      await connectDB();

      const settings = await UserSettings.findOneAndUpdate(
        { userId },
        { $set: newSettings },
        { new: true, upsert: true }
      );

      return settings;
    } catch (error) {
      throw error;
    }
  }

  async getSettings(userId: string) {
    try {
      await connectDB();
      return await UserSettings.findOne({ userId });
    } catch (error) {
      throw error;
    }
  }
}