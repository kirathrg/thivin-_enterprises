import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thivin Enterprises - Quality Home Appliances",
  description: "Your one-stop shop for quality home appliances and combo packs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <AuthProvider>
              <CartProvider>
                <SearchProvider>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex-grow pt-16">{children}</div>
                    <Footer />
                  </div>
                </SearchProvider>
              </CartProvider>
            </AuthProvider>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
