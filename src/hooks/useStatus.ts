// src/hooks/useStatus.ts
'use client';

import { useState, useEffect } from 'react';
import type { UserStatus } from '@/types';

interface UserStatusData {
  status: UserStatus;
  userName: string;
}

export function useStatus() {
  const [statusData, setStatusData] = useState<UserStatusData | null>(null);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/user/status');
      if (response.ok) {
        const data = await response.json();
        setStatusData(data);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const updateStatus = async (newStatus: UserStatus) => {
    try {
      const response = await fetch('/api/user/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatusData(data);
        return data;
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error;
    }
  };

  return { statusData, updateStatus, fetchStatus };
}