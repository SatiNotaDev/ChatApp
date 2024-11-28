import { NextResponse } from 'next/server';
import { RegisterController } from '@/controllers';

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    const registerController = new RegisterController();
    const user = await registerController.register(userData);

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}
