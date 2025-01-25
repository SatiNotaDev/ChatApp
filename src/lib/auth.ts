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


export function verifyToken(token: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      if (!token) {
        resolve(null);
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      resolve(decoded.userId);
    } catch (error) {
      console.error('Token verification error:', error);
      resolve(null);
    }
  });
}


export function extractToken(cookieString: string): string | null {
  try {
    const cookies = cookieString.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    return cookies['token'] || null;
  } catch (error) {
    console.error('Cookie parsing error:', error);
    return null;
  }
}


export function createToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d' 
  });
}