'use client';

import { useState, useEffect } from 'react';

interface Settings {
 theme: 'light' | 'dark' | 'pink';
 fontSize: 'normal' | 'large' | 'larger';
 sound: boolean;
 notifications: boolean;
}

export function useSettings() {
 const [settings, setSettings] = useState<Settings | null>(null);
 const [loading, setLoading] = useState(true);

 const fetchSettings = async () => {
   try {
     const response = await fetch('/api/user/settings');
     if (!response.ok) throw new Error('Failed to fetch settings');
     const data = await response.json();
     setSettings(data);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 };

 const updateSettings = async (newSettings: Partial<Settings>) => {
   try {
     const response = await fetch('/api/user/settings', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(newSettings),
     });
     if (!response.ok) throw new Error('Failed to update settings');
     const data = await response.json();
     setSettings(prev => ({ ...prev, ...data }));
     return data;
   } catch (error) {
     console.error(error);
     throw error;
   }
 };

 useEffect(() => {
   fetchSettings();
 }, []);

 return { settings, loading, updateSettings };
}