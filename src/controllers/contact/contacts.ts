import { Contact, UserContacts } from '@/models';
import { connectDB } from '@/lib/mongoose';

export class ContactsController {
  async getAllContacts(searchQuery?: string) {
    try {
      await connectDB();
      const query = searchQuery
        ? {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { department: { $regex: searchQuery, $options: 'i' } },
            ],
          }
        : {};
      return await Contact.find(query).sort({ name: 1 });
    } catch (error) {
      console.error('Error fetching all contacts:', error);
      throw new Error('Failed to fetch contacts');
    }
  }

  // Получить контакты пользователя
  async getUserContacts(userId: string, searchQuery?: string) {
    try {
      await connectDB();
      const userContacts = await UserContacts.findOne({ userId }).populate({
        path: 'contactIds',
        match: searchQuery
          ? {
              $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { department: { $regex: searchQuery, $options: 'i' } },
              ],
            }
          : {},
      });
      return userContacts?.contactIds || [];
    } catch (error) {
      console.error(`Error fetching contacts for user ${userId}:`, error);
      throw new Error('Failed to fetch user contacts');
    }
  }

  // Добавить контакт пользователю
  async addContactToUser(userId: string, contactId: string) {
    try {
      await connectDB();
      const updatedUserContacts = await UserContacts.findOneAndUpdate(
        { userId },
        { $addToSet: { contactIds: contactId } },
        { upsert: true, new: true }
      ).populate('contactIds');
      return updatedUserContacts?.contactIds || [];
    } catch (error) {
      console.error(`Error adding contact ${contactId} to user ${userId}:`, error);
      throw new Error('Failed to add contact');
    }
  }

  // Удалить контакт у пользователя
  async removeContactFromUser(userId: string, contactId: string) {
    try {
      await connectDB();
      const updatedUserContacts = await UserContacts.findOneAndUpdate(
        { userId },
        { $pull: { contactIds: contactId } },
        { new: true }
      ).populate('contactIds');
      return updatedUserContacts?.contactIds || [];
    } catch (error) {
      console.error(`Error removing contact ${contactId} from user ${userId}:`, error);
      throw new Error('Failed to remove contact');
    }
  }
}
