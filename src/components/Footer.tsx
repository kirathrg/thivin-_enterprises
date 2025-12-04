"use client";

import React from "react";
import Link from "next/link";
import { Home, Package, Info } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 mt-12 shadow-2xl animate-[slideUp_0.8s_ease-out]">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Home className="h-6 w-6" />
              <span>Thivin Enterprises</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for quality home appliances and combo packs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Package className="h-4 w-4" /> Products
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Info className="h-4 w-4" /> About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info (Placeholder) */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 text-sm">Email: info@thivin.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 123 456 7890</p>
            <p className="text-gray-400 text-sm">Address: 123 Main St, City, State, 12345</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {currentYear} Thivin Enterprises. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;