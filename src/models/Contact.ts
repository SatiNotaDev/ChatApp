import mongoose, { Document } from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const userContactsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }]
});

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export const UserContacts = mongoose.models.UserContacts || mongoose.model('UserContacts', userContactsSchema);