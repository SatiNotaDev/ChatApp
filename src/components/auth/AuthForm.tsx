'use client';

import React, { useState, Suspense } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import LoginForm from './LoginForm';

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  department?: string;
}

const RegisterForm = dynamic(() => import('./RegisterForm'), {
  loading: () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  ),
});

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleSubmit = async (formData: AuthFormData) => {
    try {
      setError(null);
      setLoading(true);
  
      if (isLogin) {
        console.log('Logging in...');
        await login({ email: formData.email, password: formData.password });
      } else {
        if (!formData.name || !formData.department) {
          throw new Error('Name and department are required');
        }
  
        console.log('Registering user...');
        await register({ 
          name: formData.name, 
          email: formData.email, 
          password: formData.password,
          department: formData.department 
        });
        
        console.log('Logging in after registration...');
        await login({ email: formData.email, password: formData.password });
      }
  
      console.log('Redirecting to /chats...');
      router.push('/chats');
    } catch (err: any) {
      console.error('Error during authentication:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" suppressHydrationWarning>
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>
              {isLogin ? 'Login' : 'Registration'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to your account' 
                : 'Create a new account'}
            </CardDescription>
            {error && (
              <div className="text-sm text-red-500 mt-2">
                {error}
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <Suspense fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            }>
              {isLogin ? (
                <LoginForm onSubmit={handleSubmit} />
              ) : (
                <RegisterForm onSubmit={handleSubmit} />
              )}
            </Suspense>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full"
              onClick={() => {
                const form = document.querySelector('form');
                if (form) form.requestSubmit();
              }}
              disabled={loading}
            >
              {loading 
                ? 'Processing...' 
                : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
            <Button 
              variant="ghost"
              className="w-full"
              onClick={toggleForm}
              disabled={loading}
            >
              {isLogin 
                ? "Don't have an account? Register" 
                : 'Already have an account? Sign in'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;