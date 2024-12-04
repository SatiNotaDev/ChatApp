'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Settings,
  MessageSquare,
  Users,
  LogOut,
  Circle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

const statusStyles = {
  online: { color: "text-green-500 fill-green-500", label: "Online" },
  offline: { color: "text-gray-500 fill-gray-500", label: "Offline" },
  busy: { color: "text-red-500 fill-red-500", label: "Busy" },
  vacation: { color: "text-yellow-500 fill-yellow-500", label: "Vacation" },
};

const navItems = [
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
  const router = useRouter();
  const { logout } = useAuth();
  const { userData, fetchUserData } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userData) return; // Если пользователь не авторизован, пропускаем запрос
    fetchUserData();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      router.push("/"); // Перенаправляем на главную страницу
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatusIndicator = React.memo(() => {
    if (!userData) return null; // Если данных нет, ничего не рендерим
    return (
      <div className="flex items-center gap-2">
        <Circle
          className={`h-3 w-3 ${
            statusStyles[userData.status || "offline"].color
          }`}
        />
        <span className="text-sm text-gray-600">
          {statusStyles[userData.status || "offline"].label}
        </span>
      </div>
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="font-medium">{userData?.name}</h3>
                <StatusIndicator />
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
              disabled={isLoading}
            >
              <LogOut className="h-5 w-5" />
              <span>{isLoading ? "Logging out..." : "Logout"}</span>
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
