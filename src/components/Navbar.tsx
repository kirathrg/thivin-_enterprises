"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false); // State for CommandPalette
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/products");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
        <Home className="h-6 w-6" />
        <span>Thivin Enterprises</span>
      </Link>

      {/* Search Bar (Desktop) - Now a button to open Command Palette */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          onClick={() => setIsCommandPaletteOpen(true)}
        >
          <Search className="h-4 w-4 mr-2" />
          Search products...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Desktop Navigation Icons */}
      <div className="hidden md:flex items-center gap-4">
        <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700">
          <Link to="/products" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="hidden lg:inline">Products</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700">
          <Link to="/about-us" className="flex items-center gap-2">
            <Info className="h-6 w-6" />
            <span className="hidden lg:inline">About Us</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setIsCartDrawerOpen(true)}
        >
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white">
              {cartItemCount}
            </Badge>
          )}
        </Button>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6 text-blue-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <UserRoundCog className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsAuthModalOpen(true)}>
            <LogIn className="h-6 w-6 text-blue-600" />
          </Button>
        )}
      </div>

      {/* Mobile Menu and Icons */}
      <div className="flex md:hidden items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setIsCartDrawerOpen(true)}
        >
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white">
              {cartItemCount}
            </Badge>
          )}
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-blue-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Menu</h2>
            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full focus-visible:ring-blue-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center">
                <Search className="h-4 w-4" /> Search
              </Button>
            </form>
            <div className="flex flex-col gap-2 mt-4">
              <Button asChild variant="ghost" className="justify-start text-blue-600 hover:text-blue-700">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start text-blue-600 hover:text-blue-700">
                <Link to="/products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" /> Products
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start text-blue-600 hover:text-blue-700">
                <Link to="/about-us" className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> About Us
                </Link>
              </Button>
              {isAuthenticated ? (
                <>
                  <Button asChild variant="ghost" className="justify-start text-blue-600 hover:text-blue-700">
                    <Link to="/profile" className="flex items-center gap-2">
                      <UserRoundCog className="h-4 w-4" /> Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="justify-start text-blue-600 hover:text-blue-700"
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
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </nav>
  );
};

export default Navbar;