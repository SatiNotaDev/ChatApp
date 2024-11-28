import { User, UserStatus, UserSettings } from '@/models/index';
import {connectDB} from '@/lib/mongoose'
import { IUser } from '@/types';

export class RegisterController {
  async register(userData: Omit<IUser, 'comparePassword'>) {
    try {
      console.log('Connecting to database...');
      await connectDB();

      console.log('Checking for existing user...');
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log('User already exists:', existingUser);
        throw new Error('User already exists');
      }

      console.log('Creating new user...');
      const user = await User.create(userData);

      console.log('Creating user status...');
      await UserStatus.create({
        userId: user._id,
        status: 'offline',
      });

      console.log('Creating user settings...');
      await UserSettings.create({
        userId: user._id,
        theme: 'light',
        fontSize: 'normal',
        notifications: true,
        sound: true,
      });

      console.log('User registered successfully:', user);
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}
