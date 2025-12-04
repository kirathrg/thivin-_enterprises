"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  ShoppingCart,
  User,
  Menu,
  Search,
  Package,
  Info,
  LogIn,
  LogOut,
  UserRoundCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import CommandPalette from "./CommandPalette"; // Import the new CommandPalette
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { cartItemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push("/products");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 font-semibold text-xl group">
        <img 
          src="/logo.png" 
          alt="Thivin Enterprises Logo" 
          className="h-10 w-10 object-contain rounded-lg group-hover:scale-105 transition-transform"
        />
        <span className="text-gray-900 hidden sm:inline">Thivin Enterprises</span>
      </Link>

      {/* Search Bar (Desktop) - Now a button to open Command Palette */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-10"
          onClick={() => setIsCommandPaletteOpen(true)}
        >
          <Search className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm">Search products...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Desktop Navigation Icons */}
      <div className="hidden md:flex items-center gap-2">
        <Button asChild variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 h-10">
          <Link href="/products" className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span className="hidden lg:inline text-sm font-medium">Products</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 h-10">
          <Link href="/about-us" className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <span className="hidden lg:inline text-sm font-medium">About Us</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="relative hover:bg-gray-100 text-gray-700 hover:text-gray-900 h-10"
          onClick={() => setIsCartDrawerOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden lg:inline ml-2 text-sm font-medium">Cart</span>
          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Button>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 h-10 w-10">
                <User className="h-5 w-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <UserRoundCog className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" onClick={() => setIsAuthModalOpen(true)} className="hover:bg-gray-100 flex items-center gap-2 h-10">
            <LogIn className="h-5 w-5" />
            <span className="hidden lg:inline text-sm font-medium">Login</span>
          </Button>
        )}
      </div>

      {/* Mobile Menu and Icons */}
      <div className="flex md:hidden items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100"
          onClick={() => setIsCartDrawerOpen(true)}
        >
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2 mt-6">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white flex items-center gap-2 justify-center">
                <Search className="h-4 w-4" /> Search
              </Button>
            </form>
            <div className="flex flex-col gap-1 mt-6">
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/" className="flex items-center gap-3">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/products" className="flex items-center gap-3">
                  <Package className="h-4 w-4" /> Products
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/about-us" className="flex items-center gap-3">
                  <Info className="h-4 w-4" /> About Us
                </Link>
              </Button>
              {isAuthenticated ? (
                <>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/profile" className="flex items-center gap-3">
                      <UserRoundCog className="h-4 w-4" /> Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="justify-start"
                >
                  <LogIn className="h-4 w-4 mr-3" /> Login
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} onToggle={() => setIsCommandPaletteOpen(!isCommandPaletteOpen)} />
    </nav>
  );
};

export default Navbar;