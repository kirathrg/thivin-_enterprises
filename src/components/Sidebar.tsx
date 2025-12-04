"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  User,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const pathname = usePathname();

  const mainNavigation = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/checkout", icon: ShoppingCart, label: "Checkout" },
    { href: "/about-us", icon: Info, label: "About Us" },
  ];

  return (
    <aside className="hidden md:fixed md:left-0 md:top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 md:flex flex-col shadow-sm">
      {/* Logo/Brand */}
      <div className="h-14 flex items-center px-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-gray-900 font-semibold">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8 w-8 object-contain rounded-full"
          />
          <span className="text-sm">Thivin Enterprises</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Bottom Profile */}
      <div className="p-3 border-t border-gray-200">
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === "/profile"
              ? "bg-primary text-white"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          <User className="h-4 w-4 flex-shrink-0" />
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
