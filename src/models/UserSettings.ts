import mongoose from "mongoose";
import {IUserSettings} from '@/types'

const userSettingsSchema = new mongoose.Schema<IUserSettings>({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'pink'],
      default: 'light'
    },
    fontSize: {
      type: String,
      enum: ['normal', 'large', 'larger'],
      default: 'normal'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    sound: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: true
  });
  
  export const UserSettings = mongoose.models.UserSettings || mongoose.model('UserSettings', userSettingsSchema);