"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import { Truck, Headset, ShieldCheck, Phone, MessageCircle, ShoppingBag, Gift, CheckCircle, Sparkles, Heart } from "lucide-react";
import React, { useState, useEffect } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Full Screen */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-[85vh] md:min-h-screen flex items-start justify-center px-4 md:px-6 pt-16 md:pt-20">
        {/* Decorative Background Elements with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-700"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"
            style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.2}px)` }}
          ></div>
        </div>

        <div 
          className="max-w-7xl mx-auto relative z-10"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          {/* Main Hero Content */}
          <div className="text-center mb-6 md:mb-12">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-5 md:mb-6 animate-fade-in-down leading-tight px-4"
              style={{ transform: `translateY(${scrollY * -0.15}px)` }}
            >
              Thivin Enterprises
            </h1>
            
            <p 
              className="text-sm md:text-lg lg:text-xl text-gray-700 mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in-up px-2 leading-relaxed"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            >
              Your one-stop shop for quality home appliances and combo packs.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-scale-in mb-10 md:mb-16 px-4 w-full max-w-md mx-auto sm:max-w-none">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-50 px-6 md:px-8 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-primary w-full sm:w-auto">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-50 px-6 md:px-8 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-primary w-full sm:w-auto">
                <Link href="/about-us">Learn More</Link>
              </Button>
            </div>

            {/* Feature Pills */}
            <div 
              className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in px-4"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
                <Gift className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Best Deals</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Quality Assured</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Fast Delivery</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
                <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Trusted by 1000s</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Down Indicator with Arrow Animation */}
        <div className="absolute bottom-8 md:bottom-20 left-0 right-0 flex justify-center z-20">
          <div 
            className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer animate-bounce"
            onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider">Scroll Down</span>
            <div className="flex flex-col gap-1">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-primary animate-arrow-down" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-primary rounded-full flex items-start justify-center p-1.5 md:p-2">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary rounded-full animate-scroll-indicator"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-10 md:py-16 px-4 md:px-6 scroll-mt-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-10 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg animate-fade-in-up delay-200 px-2">
              Discover our carefully curated selection of combo packs
            </p>
          </div>
          <div className="animate-fade-in-up delay-300">
            <ProductCarousel products={products} />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 md:py-8 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card 
              className="p-6 text-center border-gray-200 bg-white group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                animation: 'flipInX 0.8s ease-out',
                animationDelay: '0ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-blue-200">
                  <Truck className="h-7 w-7 text-blue-600 transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">Fast Delivery</h3>
                <p className="text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-700">
                  Get your products delivered quickly and safely to your doorstep
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 text-center border-gray-200 bg-white group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                animation: 'flipInX 0.8s ease-out',
                animationDelay: '150ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-emerald-200">
                  <Headset className="h-7 w-7 text-emerald-600 transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-emerald-600">24/7 Support</h3>
                <p className="text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-700">
                  Our customer support team is always here to help you
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 text-center border-gray-200 bg-white group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                animation: 'flipInX 0.8s ease-out',
                animationDelay: '300ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-purple-200">
                  <ShieldCheck className="h-7 w-7 text-purple-600 transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-purple-600">Quality Guarantee</h3>
                <p className="text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-700">
                  100% satisfaction guarantee on all our products
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;