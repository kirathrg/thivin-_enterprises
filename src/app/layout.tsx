import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thivin Enterprises - Quality Home Appliances",
  description: "Your one-stop shop for quality home appliances and combo packs",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Thivin Enterprises",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3b82f6",
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
            <div className="flex min-h-screen bg-white">
              <div className="flex-1 flex flex-col">
                <TopHeader />
                <main className="pt-16 flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </div>

            {/* Floating Contact Buttons */}
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 md:gap-3" style={{ zIndex: 9999 }}>
              <Button
                size="icon"
                asChild
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <a
                  href="https://wa.me/911234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
              <Button
                size="icon"
                asChild
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <a
                  href="tel:+911234567890"
                  aria-label="Call us"
                >
                  <Phone className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
            </div>
            <Toaster />
            <Sonner position="top-right" toastOptions={{ style: { zIndex: 99999, marginTop: '4rem' } }} />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
