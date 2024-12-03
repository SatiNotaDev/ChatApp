import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuth } from '@/lib/auth';
import { LogoutController } from '@/controllers';

export async function POST(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const logoutController = new LogoutController();
    await logoutController.logout(userId);

    // Очищаем cookie с токеном
    const cookieStore = await cookies();
    cookieStore.delete('token');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}