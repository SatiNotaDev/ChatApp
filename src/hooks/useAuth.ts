import  type{ LoginData, RegisterData} from '@/types'

  export function useAuth() {
    const login = async (data: LoginData) => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        }
  
        return await response.json();
      } catch (error: any) {
        throw new Error(error.message || 'Login failed');
      }
    };
  
    const register = async (data: RegisterData) => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Registration failed');
        }
  
        return await response.json();
      } catch (error: any) {
        throw new Error(error.message || 'Registration failed');
      }
    };
  
    return { login, register };
  }