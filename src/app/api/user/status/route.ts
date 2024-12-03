import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { UserStatusController } from '@/controllers';

export async function GET(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const statusController = new UserStatusController();
    const status = await statusController.getStatus(userId);

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status } = await req.json();
    const statusController = new UserStatusController();
    const updatedStatus = await statusController.setStatus(userId, status);

    return NextResponse.json(updatedStatus);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}