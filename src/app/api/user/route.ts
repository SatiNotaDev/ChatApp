import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/models/User';
import { UserStatus } from '@/models/UserStatus';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const [user, userStatus] = await Promise.all([
      User.findById(userId).select('name email'),
      UserStatus.findOne({ userId })
    ]);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = {
      name: user.name,
      email: user.email,
      status: userStatus?.status || 'offline'
    };

    return NextResponse.json(userData);

  } catch (error) {
    console.error('Get user data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}