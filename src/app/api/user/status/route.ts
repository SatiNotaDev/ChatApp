import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { UserStatus } from '@/models/UserStatus';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const status = await UserStatus.findOne({ userId });

    return NextResponse.json({
      status: status?.status || 'vacation'
    });
  } catch (error) {
    console.error('Failed to fetch user status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user status' },
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

    const { status } = await req.json();
    await connectDB();

    await UserStatus.findOneAndUpdate(
      { userId },
      { status, lastSeen: new Date(), isTemporary: status !== 'vacation' },
      { upsert: true }
    );

    return NextResponse.json({ status });
  } catch (error) {
    console.error('Failed to update user status:', error);
    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    );
  }
}
