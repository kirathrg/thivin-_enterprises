"use client";

import React from "react";
import Link from "next/link";
import { Home, Package, Info, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-8 md:py-10 overflow-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full max-w-[calc(100vw-2rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-6 md:mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <Home className="h-5 w-5" />
              <span>Thivin Enterprises</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your one-stop shop for quality home appliances and combo packs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Package className="h-4 w-4" /> Products
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" /> About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact Us</h3>
            <div className="space-y-1.5 mb-4">
              <p className="text-gray-300 text-sm">Email: info@thivin.com</p>
              <p className="text-gray-300 text-sm">Phone: +91 123 456 7890</p>
              <p className="text-gray-300 text-sm">Address: 123 Main St, City, State, 12345</p>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-accent flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-accent flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-accent flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-sage/50 pt-4 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Thivin Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;