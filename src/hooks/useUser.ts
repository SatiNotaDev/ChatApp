import { useState, useEffect } from 'react';
import { UserData } from '@/types';

export function useUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUserData = async () => {
    let isCancelled = false;
    setLoading(true);
    try {
      const response = await fetch('/api/user');

      if (response.status === 401) {
    
        logout();
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user data');
      }

      const data = await response.json();
      if (!isCancelled) {
        setUserData(data);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      if (!isCancelled) {
        setUserData({
          name: 'User',
          email: '',
          status: 'online',
          theme: 'light',
          fontSize: 'normal',
          sound: true,
          notifications: true,
        });
      }
    } finally {
      if (!isCancelled) {
        setLoading(false);
      }
    }

    return () => {
      isCancelled = true; 
    };
  };


  const updateUserStatus = async (status: UserData['status']) => {
    try {
      const response = await fetch('/api/user/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      const data = await response.json();
      setUserData((prev) => (prev ? { ...prev, status: data.status } : null));
      return data;
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error;
    }
  };

  const updateSettings = async (settings: Partial<Omit<UserData, 'name' | 'email' | 'status'>>) => {
    try {
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to update settings');

      const data = await response.json();
      setUserData((prev) => (prev ? { ...prev, ...data } : null));
      return data;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  };

  
  const logout = () => {
    setUserData(null); 
    setLoading(false); 
  };

  
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchUserData();
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };
    loadData();
  }, []);

  return {
    userData,
    loading,
    fetchUserData,
    updateUserStatus,
    updateSettings,
    logout, 
  };
}
