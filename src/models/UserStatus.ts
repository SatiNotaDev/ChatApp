import mongoose from 'mongoose';

const userStatusSchema = new mongoose.Schema({
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
  isPermanent: {    
    type: Boolean,
    default: false 
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
});

export const UserStatus = mongoose.models.UserStatus || mongoose.model('UserStatus', userStatusSchema);