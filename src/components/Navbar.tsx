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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-lg p-4 flex items-center justify-between border-b border-blue-200">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
        <img 
          src="/logo.png" 
          alt="Thivin Enterprises Logo" 
          className="h-12 w-12 object-contain rounded-full group-hover:scale-105 transition-transform drop-shadow-lg"
        />
        <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent hidden sm:inline">Thivin Enterprises</span>
      </Link>

      {/* Search Bar (Desktop) - Now a button to open Command Palette */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground border-blue-200 hover:border-blue-300 hover:bg-blue-50"
          onClick={() => setIsCommandPaletteOpen(true)}
        >
          <Search className="h-4 w-4 mr-2 text-blue-600" />
          Search products...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gradient-to-r from-blue-100 to-cyan-100 px-1.5 font-mono text-[10px] font-medium text-blue-700 opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Desktop Navigation Icons */}
      <div className="hidden md:flex items-center gap-4">
        <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
          <Link href="/products" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="hidden lg:inline">Products</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
          <Link href="/about-us" className="flex items-center gap-2">
            <Info className="h-6 w-6" />
            <span className="hidden lg:inline">About Us</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-blue-50"
          onClick={() => setIsCartDrawerOpen(true)}
        >
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
              {cartItemCount}
            </Badge>
          )}
        </Button>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50/50">
                <User className="h-6 w-6 text-blue-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-blue-200">
              <DropdownMenuLabel className="text-blue-700">{user?.name || "My Account"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="hover:bg-blue-50">
                <Link href="/profile" className="flex items-center gap-2 text-blue-600">
                  <UserRoundCog className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsAuthModalOpen(true)} className="hover:bg-blue-50/50">
            <LogIn className="h-6 w-6 text-blue-600" />
          </Button>
        )}
      </div>

      {/* Mobile Menu and Icons */}
      <div className="flex md:hidden items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-purple-50/50"
          onClick={() => setIsCartDrawerOpen(true)}
        >
          <ShoppingCart className="h-6 w-6 text-purple-600" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg">
              {cartItemCount}
            </Badge>
          )}
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-purple-50/50">
              <Menu className="h-6 w-6 text-purple-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col border-l-4 border-purple-300 bg-gradient-to-b from-white to-purple-50/30">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">Menu</h2>
            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full focus-visible:ring-purple-600 border-purple-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center gap-2 justify-center">
                <Search className="h-4 w-4" /> Search
              </Button>
            </form>
            <div className="flex flex-col gap-2 mt-4">
              <Button asChild variant="ghost" className="justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-100/50">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-100/50">
                <Link href="/products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" /> Products
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-100/50">
                <Link href="/about-us" className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> About Us
                </Link>
              </Button>
              {isAuthenticated ? (
                <>
                  <Button asChild variant="ghost" className="justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-100/50">
                    <Link href="/profile" className="flex items-center gap-2">
                      <UserRoundCog className="h-4 w-4" /> Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-100/50"
                >
                  <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} onToggle={() => setIsCommandPaletteOpen(!isCommandPaletteOpen)} />
    </nav>
  );
};

export default Navbar;