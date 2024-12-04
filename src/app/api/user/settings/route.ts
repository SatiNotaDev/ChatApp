import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { UserSettings } from '@/models';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
 try {
   const userId = await verifyAuth(req);
   if (!userId) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   await connectDB();
   const settings = await UserSettings.findOne({ userId });

   return NextResponse.json(settings || {
     theme: 'light',
     fontSize: 'normal',
     sound: true,
     notifications: true
   });
 } catch (error) {
   return NextResponse.json(
     { error: 'Failed to fetch settings' },
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

   const updates = await req.json();
   await connectDB();

   const settings = await UserSettings.findOneAndUpdate(
     { userId },
     { $set: updates },
     { new: true, upsert: true }
   );

   return NextResponse.json(settings);
 } catch (error) {
   return NextResponse.json(
     { error: 'Failed to update settings' },
     { status: 500 }
   );
 }
}