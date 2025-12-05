"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  UserRoundCog,
  Menu,
  Home,
  Package,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartStore, selectCartItemCount } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchStore } from "@/store/useSearchStore";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CommandPalette from "./CommandPalette";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopHeader = () => {
  const cartItemCount = useCartStore(selectCartItemCount);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const mainNavigation = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/checkout", icon: ShoppingCart, label: "Checkout" },
    { href: "/about-us", icon: Info, label: "About Us" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push("/products");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 md:left-64 right-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center px-3 md:px-6 justify-between">
        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-1 hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="h-14 flex items-center justify-center px-4 border-b border-gray-200">
              <SheetTitle className="flex items-center gap-2 text-gray-900 font-semibold">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-8 w-8 object-contain rounded-full flex-shrink-0"
                />
                <span className="text-sm whitespace-nowrap">Thivin Enterprises</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col p-3">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 my-3"></div>
              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/profile" 
                    ? "bg-primary text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mr-1 md:mr-0">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-9 px-2 md:px-3"
            onClick={() => setIsCommandPaletteOpen(true)}
          >
            <Search className="h-4 w-4 mr-1 md:mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-xs md:text-sm truncate">Search...</span>
            <kbd className="ml-auto pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-2 ml-auto">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            onClick={() => setIsCartDrawerOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserRoundCog className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} onToggle={() => setIsCommandPaletteOpen(!isCommandPaletteOpen)} />
    </>
  );
};

export default TopHeader;
