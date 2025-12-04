"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard"; // Keep ProductCard for individual use if needed, but not directly in the grid
import ProductCarousel from "@/components/ProductCarousel"; // Import the new ProductCarousel
import { Truck, Headset, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen -mt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white pt-32 pb-20 md:pt-40 md:pb-32 flex items-center justify-center text-center overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_7s_infinite]"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_7s_infinite_2s]"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_7s_infinite_4s]"></div>
        
        {/* Floating Icons/Shapes */}
        <div className="absolute top-1/4 left-1/4 animate-[float_6s_ease-in-out_infinite]">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl rotate-12 shadow-2xl"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-[floatSlow_8s_ease-in-out_infinite]">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full shadow-2xl"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-[float_7s_ease-in-out_infinite_2s]">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg -rotate-12 shadow-2xl"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 animate-[floatSlow_9s_ease-in-out_infinite_1s]">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full shadow-xl"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0yNiA0NGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAxMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAxMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHpNMTYgNTRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium animate-fade-in-down border border-white/30">
            ✨ Welcome to Premium Shopping Experience
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-down drop-shadow-2xl" style={{animationDelay: '0.1s'}}>
            <span className="inline-block animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-white via-blue-100 to-white bg-[length:200%_auto] bg-clip-text text-transparent">
              Thivin Enterprises
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-in-up drop-shadow-lg leading-relaxed" style={{animationDelay: '0.2s'}}>
            Your one-stop shop for quality home appliances and combo packs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{animationDelay: '0.3s'}}>
            <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 text-lg rounded-full shadow-2xl hover:scale-105 transition-all hover:shadow-white/50 font-semibold">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 text-lg rounded-full shadow-2xl hover:scale-105 transition-all hover:shadow-white/50 font-semibold">
              <Link href="/about-us">Learn More</Link>
            </Button>
          </div>
          
          {/* Features Highlights */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">Best Deals</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">Quality Assured</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">Trusted by 1000s</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent -z-10"></div>
        <div className="absolute top-10 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-[floatSlow_8s_ease-in-out_infinite]"></div>
        
        {/* Decorative dots */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-sky-400 rounded-full animate-[pulse_3.5s_ease-in-out_infinite]"></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-12 animate-fade-in-down">
            Featured Combo Packs
          </h2>
          <div className="animate-[slideUp_0.8s_ease-out]" style={{animationDelay: '0.2s'}}>
            <ProductCarousel products={products} /> {/* Use the ProductCarousel here */}
          </div>
          <div className="flex justify-center mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Link href="/products">View More Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent -z-10"></div>
        <div className="absolute top-10 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-[floatSlow_8s_ease-in-out_infinite]"></div>
        
        {/* Decorative dots */}
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-blue-400 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-sky-400 rounded-full animate-[pulse_3.5s_ease-in-out_infinite]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-8 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl hover-lift animate-[slideUp_0.6s_ease-out] border border-blue-100/50" style={{animationDelay: '0.1s'}}>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-[pulse_2s_ease-in-out_infinite]"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg">
                  <Truck className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders above ₹5000</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl hover-lift animate-[slideUp_0.6s_ease-out] border border-cyan-100/50" style={{animationDelay: '0.2s'}}>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-[pulse_2s_ease-in-out_infinite]" style={{animationDelay: '0.5s'}}></div>
                <div className="relative p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg">
                  <Headset className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer assistance</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl hover-lift animate-[slideUp_0.6s_ease-out] border border-sky-100/50" style={{animationDelay: '0.3s'}}>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl animate-[pulse_2s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
                <div className="relative p-4 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-full shadow-lg">
                  <ShieldCheck className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-600">100% protected transactions</p>
            </div>
          </div>
        </div>
      </section>

      <MadeWithDyad />

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/911234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        
        {/* Call Button */}
        <a
          href="tel:+911234567890"
          className="group bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};

export default Index;