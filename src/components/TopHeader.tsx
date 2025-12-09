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
  ShoppingBag,
  Phone,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore, selectCartItemCount } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchStore } from "@/store/useSearchStore";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import PWAInstallPrompt from "./PWAInstallPrompt";
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
  const { searchQuery } = useSearchStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPWAPromptOpen, setIsPWAPromptOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const mainNavigation = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "#", icon: ShoppingCart, label: "Cart", onClick: () => setIsCartDrawerOpen(true) },
    { href: "/about-us", icon: Info, label: "About Us" },
    { href: "/contact-us", icon: Phone, label: "Contact Us" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="h-full flex items-center justify-between px-3 md:px-6 gap-2">
          {/* Left Section: Mobile Menu + Logo */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 h-10 w-10">
                    <Menu className="h-5 w-5 text-charcoal" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetHeader className="h-16 flex items-center justify-center px-4 border-b border-gray-200 bg-white">
                    <SheetTitle className="flex items-center gap-2 text-charcoal font-semibold">
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

                      if (item.onClick) {
                        return (
                          <button
                            key={item.label}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              item.onClick();
                            }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                            {item.label === "Cart" && cartItemCount > 0 && (
                              <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                              </span>
                            )}
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive
                              ? "bg-dusty-rose text-white"
                              : "text-charcoal hover:bg-gray-100"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img
                src="/logo.png"
                alt="Thivin Enterprises Logo"
                className="h-9 w-9 object-contain rounded-full flex-shrink-0"
              />
              <span className="hidden sm:block text-base font-semibold text-charcoal whitespace-nowrap">
                Thivin Enterprises
              </span>
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {mainNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (item.onClick) {
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-charcoal hover:bg-gray-100 relative"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {item.label === "Cart" && cartItemCount > 0 && (
                      <Badge className="ml-1 h-5 min-w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs font-bold">
                        {cartItemCount}
                      </Badge>
                    )}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-dusty-rose text-white shadow-sm"
                      : "text-charcoal hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Search Icon Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 text-charcoal h-10 w-10"
              onClick={() => setIsCommandPaletteOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* PWA Install Button - Mobile Only */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100 text-charcoal h-10 w-10"
              onClick={() => setIsPWAPromptOpen(true)}
            >
              <Smartphone className="h-5 w-5" />
            </Button>

            {/* User Menu - Only when authenticated */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hover:bg-gray-100 h-10 px-2 md:px-3 gap-2">
                    <User className="h-5 w-5 text-charcoal" />
                    <span className="hidden md:inline text-sm font-medium text-charcoal">{user?.name}</span>
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
                className="bg-dusty-rose hover:bg-dusty-rose/90 text-white border-0 h-10 px-3 text-sm hidden sm:flex rounded-md"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Mobile Sign In Button */}
            {!isAuthenticated && (
              <Button
                variant="default"
                size="sm"
                className="sm:hidden bg-dusty-rose hover:bg-dusty-rose/90 text-white border-0 h-9 px-3 text-xs rounded-md"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <LogIn className="h-4 w-4 mr-1.5" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} onToggle={() => setIsCommandPaletteOpen(!isCommandPaletteOpen)} />
      <PWAInstallPrompt isOpen={isPWAPromptOpen} onClose={() => setIsPWAPromptOpen(false)} />
    </>
  );
};

export default TopHeader;
