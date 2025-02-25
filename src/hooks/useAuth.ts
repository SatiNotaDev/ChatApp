'use client';

import { useRouter } from 'next/navigation';
import type { LoginData, RegisterData } from '@/types';

export function useAuth() {
  const router = useRouter();

  const login = async (data: LoginData) => {
    try {
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const userData = await loginResponse.json();
  
      if (!loginResponse.ok) {
        throw new Error(userData.error || 'Login failed');
      }

      const statusResponse = await fetch('/api/user/status');
      const currentStatus = await statusResponse.json();

      if (!currentStatus || !currentStatus.isPermanent) {
        await fetch('/api/user/status', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'online' })
        });
      }

      router.refresh();
      return userData;
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
  };


const register = async (data: RegisterData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Registration failed');
    }

    await fetch('/api/user/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'online' }),
    });

    router.refresh();
    return responseData;
  } catch (error: any) {
    console.error('Registration client error:', error);
    throw new Error(error.message || 'Registration failed');
  }
};

  const logout = async () => {
    try {
      const statusResponse = await fetch('/api/user/status');
      const currentStatus = await statusResponse.json();

      if (!currentStatus || !currentStatus.isPermanent) {
        await fetch('/api/user/status', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'offline' })
        });
      }

      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Logout failed');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return { login, register, logout };
}