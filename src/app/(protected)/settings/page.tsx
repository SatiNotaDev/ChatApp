'use client';

import { UserStatus, Settings, ThemeType, FontSize } from '@/types';
import { 
 Bell, 
 Palette,
 Type, 
 Volume2, 
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
import { useUser } from '@/hooks/useUser';
import { useSettings } from '@/hooks/useSettings';
import { toast } from 'sonner';



export default function SettingsPage() {
 const { userData, updateUserStatus } = useUser();
 const { settings, updateSettings } = useSettings();

 const handleStatusChange = async (status: UserStatus) => {
   try {
     await updateUserStatus(status);
     toast.success('Status updated');
   } catch {
     toast.error('Failed to update status');
   }
 };

 const handleSettingChange = async (newSettings: Partial<Settings>) => {
   try {
     await updateSettings(newSettings);
     toast.success('Settings updated');
   } catch {
     toast.error('Failed to update settings');
   }
 };

 return (
   <div className="max-w-2xl mx-auto space-y-6">
     <Card>
       <CardHeader>
         <CardTitle>Status</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
         <div className="space-y-2">
           <Label>Status</Label>
           <RadioGroup
             value={userData?.status || 'online'}
             onValueChange={handleStatusChange}
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

     {/* Theme */}
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           <Palette className="h-5 w-5" />
           Theme
         </CardTitle>
       </CardHeader>
       <CardContent>
         <RadioGroup
           value={settings?.theme || 'light'}
           onValueChange={(value: ThemeType) => handleSettingChange({ theme: value })}
           className="grid grid-cols-3 gap-4"
         >
           <div className="flex flex-col items-center gap-2">
             <div className="w-20 h-20 rounded-lg bg-white border" />
             <RadioGroupItem value="light" id="light" />
             <Label htmlFor="light">Light</Label>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-20 h-20 rounded-lg bg-slate-900" />
             <RadioGroupItem value="dark" id="dark" />
             <Label htmlFor="dark">Dark</Label>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-20 h-20 rounded-lg bg-pink-100" />
             <RadioGroupItem value="pink" id="pink" />
             <Label htmlFor="pink">Pink</Label>
           </div>
         </RadioGroup>
       </CardContent>
     </Card>

     {/* Font Size */}
     <Card>
       <CardHeader>
         <CardTitle className="flex items-center gap-2">
           <Type className="h-5 w-5" />
           Font Size
         </CardTitle>
       </CardHeader>
       <CardContent>
         <RadioGroup
           value={settings?.fontSize || 'normal'}
           onValueChange={(value:FontSize) => handleSettingChange({ fontSize: value })}
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

     {/* Sound and Notifications */}
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
             {settings?.sound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
             <Label htmlFor="sound">Sound Effects</Label>
           </div>
           <Switch
             id="sound"
             checked={settings?.sound}
             onCheckedChange={(checked) => handleSettingChange({ sound: checked })}
           />
         </div>
         
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             {settings?.notifications ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
             <Label htmlFor="notifications">Notifications</Label>
           </div>
           <Switch
             id="notifications"
             checked={settings?.notifications}
             onCheckedChange={(checked) => handleSettingChange({ notifications: checked })}
           />
         </div>
       </CardContent>
     </Card>
   </div>
 );
}