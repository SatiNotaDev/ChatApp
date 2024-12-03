'use client';

import { useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  status: 'online' | 'offline' | 'busy' | 'vacation';
}

export function useUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      
      setUserData({
        name: data.name,
        email: data.email,
        status: data.status || 'online' 
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    
      setUserData({
        name: 'User',
        email: '',
        status: 'online'
      });
    } finally {
      setLoading(false);
    }
  };


  const updateUserStatus = async (status: UserData['status']) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedData = await response.json();
      setUserData(prev => prev ? { ...prev, status: updatedData.status } : null);
      
      return updatedData;
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userData,
    loading,
    fetchUserData,
    updateUserStatus
  };
}