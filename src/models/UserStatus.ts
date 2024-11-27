import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import {IUserStatus} from '@/types'

const userStatusSchema = new mongoose.Schema<IUserStatus>({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'busy', 'vacation'],
      default: 'offline'
    },
    lastSeen: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: true
  });
  
  export const UserStatus = mongoose.models.UserStatus || mongoose.model('UserStatus', userStatusSchema);