import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function verifyAuth(req: Request): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}