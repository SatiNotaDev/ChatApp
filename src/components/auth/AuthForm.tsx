'use client';

import React, { useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import LoginForm from './LoginForm';


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
  
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" suppressHydrationWarning>
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
          </CardHeader>
          
          <CardContent>
            <Suspense fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            }>
              {isLogin ? (
                <LoginForm />
              ) : (
                <RegisterForm />
              )}
            </Suspense>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={toggleForm}
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