// src/app/api/user/settings/route.ts
import { NextResponse } from 'next/server';
import { UserSettingsController } from '@/controllers';
import { verifyAuth } from '@/lib/auth';

export async function PUT(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const settings = await req.json();
    const settingsController = new UserSettingsController();
    const updatedSettings = await settingsController.updateSettings(
      userId,
      settings
    );

    return NextResponse.json(updatedSettings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update settings' },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const settingsController = new UserSettingsController();
    const settings = await settingsController.getSettings(userId);

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch settings' },
      { status: 400 }
    );
  }
}