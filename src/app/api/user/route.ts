import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { User, UserStatus, UserSettings } from '@/models';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const [user, status, settings] = await Promise.all([
      User.findById(userId),
      UserStatus.findOne({ userId }),
      UserSettings.findOne({ userId })
    ]);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Проверяем наличие данных и предоставляем значения по умолчанию
    const response = {
      name: user.name || 'User',
      email: user.email || '',
      status: status?.status || 'online',
      theme: settings?.theme || 'light',
      fontSize: settings?.fontSize || 'normal',
      sound: settings?.sound ?? true,
      notifications: settings?.notifications ?? true
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
 
    const data = await req.json();
    await connectDB();
 
    if (data.status) {
      await UserStatus.findOneAndUpdate(
        { userId },
        { 
          status: data.status,
          lastSeen: new Date(),
          isTemporary: data.status !== 'vacation'
        },
        { upsert: true }
      );
    }
 
    if (data.settings) {
      await UserSettings.findOneAndUpdate(
        { userId },
        { $set: data.settings },
        { upsert: true }
      );
    }
 
    const [user, status, settings] = await Promise.all([
      User.findById(userId),
      UserStatus.findOne({ userId }),
      UserSettings.findOne({ userId })
    ]);
 
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
 
    const response = {
      name: user.name || 'User', 
      email: user.email || '',
      status: status?.status || 'online',
      theme: settings?.theme || 'light',
      fontSize: settings?.fontSize || 'normal',
      sound: settings?.sound ?? true,
      notifications: settings?.notifications ?? true
    };
 
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    );
  }
 }