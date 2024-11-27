'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Settings, 
  MessageSquare, 
  Users, 
  LogOut,
  Circle 
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

type UserStatus = 'online' | 'busy' | 'unavailable' | 'vacation';

const statusStyles: Record<UserStatus, { color: string, label: string }> = {
  online: { color: 'text-green-500 fill-green-500', label: 'Online' },
  busy: { color: 'text-red-500 fill-red-500', label: 'Busy' },
  unavailable: { color: 'text-gray-500 fill-gray-500', label: 'Unavailable' },
  vacation: { color: 'text-yellow-500 fill-yellow-500', label: 'Vacation' }
};

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/chats",
    label: "Chats",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    href: "/contacts",
    label: "Contacts",
    icon: <Users className="h-5 w-5" />,
  },
  {
    href: "/search",
    label: "Search",
    icon: <Search className="h-5 w-5" />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const userStatus: UserStatus = 'online';

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const StatusIndicator = ({ status }: { status: UserStatus }) => (
    <div className="flex items-center gap-2">
      <Circle className={`h-3 w-3 ${statusStyles[status].color}`} />
      <span className="text-sm text-gray-600">
        {statusStyles[status].label}
      </span>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <Avatar>
                <img src="/api/placeholder/40/40" alt="User avatar" />
              </Avatar>
              <div>
                <h3 className="font-medium">Your Name</h3>
                <StatusIndicator status={userStatus} />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-gray-100 text-gray-900" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start space-x-3 text-gray-600 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}