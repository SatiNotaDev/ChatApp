'use client';

import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="example@gmail.com" 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="********" 
        />
      </div>
    </div>
  );
}