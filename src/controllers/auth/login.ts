import { User, UserStatus } from '@/models';
import { connectDB } from '@/lib/mongoose';
import jwt from 'jsonwebtoken';

export class LoginController {
  async login(email: string, password: string) {
    try {
      await connectDB();

    
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new Error('Invalid credentials');
      }

     
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      await UserStatus.findOneAndUpdate(
        { userId: user._id },
        { 
          status: 'online',
          lastSeen: new Date()
        },
        { upsert: true }
      );

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      const { password: _, ...userWithoutPassword } = user.toObject();
      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }
}