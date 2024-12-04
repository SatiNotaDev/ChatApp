import { useState, useEffect } from 'react';

export function useStatus() {
  const [status, setStatus] = useState<string>('vacation'); // По умолчанию "ваканс"
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/status');
      if (!response.ok) throw new Error('Failed to fetch status');
      const data = await response.json();
      setStatus(data.status || 'vacation');
    } catch (error) {
      console.error('Failed to fetch status:', error);
      setStatus('vacation'); // Если ошибка, устанавливаем "ваканс"
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    try {
      const response = await fetch('/api/user/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return { status, loading, updateStatus };
}
