import { NextResponse } from 'next/server';
import { UserStatusController } from '@/controllers';
import { verifyAuth } from '@/lib/auth'; 
export async function PUT(req: Request) {
  try {
    // Проверяем JWT токен из cookies
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status } = await req.json();
    const statusController = new UserStatusController();
    const updatedStatus = await statusController.updateStatus(userId, status);

    return NextResponse.json(updatedStatus);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update status' },
      { status: 400 }
    );
  }
}