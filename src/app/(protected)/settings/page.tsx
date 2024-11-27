'use client';

import { useState } from 'react';
import { 
  Bell, 
  Palette, 
  Type, 
  Volume2, 
  User, 
  Circle,
  VolumeX,
  BellOff
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


type Theme = 'light' | 'dark' | 'pink';
type FontSize = 'normal' | 'large' | 'larger';
type UserStatus = 'online' | 'busy' | 'unavailable' | 'vacation';

interface Settings {
  theme: Theme;
  fontSize: FontSize;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  status: UserStatus;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    fontSize: 'normal',
    soundEnabled: true,
    notificationsEnabled: true,
    status: 'online'
  });

  const handleThemeChange = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleFontSizeChange = (fontSize: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const handleStatusChange = (status: UserStatus) => {
    setSettings(prev => ({ ...prev, status }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Профиль и статус */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile & Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/api/placeholder/80/80" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <Button>Change Avatar</Button>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={settings.status}
              onValueChange={(value) => handleStatusChange(value as UserStatus)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                  Online
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="busy" id="busy" />
                <Label htmlFor="busy" className="flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-red-500 text-red-500" />
                  Busy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vacation" id="vacation" />
                <Label htmlFor="vacation" className="flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  Vacation
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Тема чата */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Chat Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings.theme}
            onValueChange={(value) => handleThemeChange(value as Theme)}
            className="grid grid-cols-3 gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-lg bg-white border"></div>
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-lg bg-slate-900"></div>
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-lg bg-pink-100"></div>
              <RadioGroupItem value="pink" id="pink" />
              <Label htmlFor="pink">Pink</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Размер шрифта */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Font Size
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings.fontSize}
            onValueChange={(value) => handleFontSizeChange(value as FontSize)}
            className="flex gap-8"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-base">Aa</span>
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal">Normal</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg">Aa</span>
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large">Large</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl">Aa</span>
              <RadioGroupItem value="larger" id="larger" />
              <Label htmlFor="larger">Larger</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Звук и уведомления */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Sound & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.soundEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
              <Label htmlFor="sound">Sound Effects</Label>
            </div>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, soundEnabled: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.notificationsEnabled ? (
                <Bell className="h-5 w-5" />
              ) : (
                <BellOff className="h-5 w-5" />
              )}
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch
              id="notifications"
              checked={settings.notificationsEnabled}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, notificationsEnabled: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}