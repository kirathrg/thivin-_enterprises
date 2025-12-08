"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import { Truck, Headset, ShieldCheck, Gift, CheckCircle, Sparkles, Heart, Headphones } from "lucide-react";
import React from "react";

const Index = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section - Full Screen with Banner Background */}
      <section className="relative overflow-hidden bg-gray-900 w-full h-screen flex items-center justify-center px-4 md:px-6">
        {/* Hero Banner Carousel as Background */}
        <HeroBannerCarousel />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Hero Content */}
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold drop-shadow-2xl mb-4 md:mb-6 leading-tight px-4 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-gradient-x">
              Thivin Enterprises
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 drop-shadow-lg mb-6 md:mb-10 max-w-2xl mx-auto animate-fade-in-up px-4 leading-relaxed">
              Your one-stop shop for quality home appliances and combo packs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-scale-in mb-8 md:mb-16 px-4 w-full max-w-sm mx-auto sm:max-w-none">
              <Button asChild size="default" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 px-6 md:px-8 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-white w-full sm:w-auto h-11 md:h-12 rounded-full">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button asChild size="default" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 md:px-8 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-white w-full sm:w-auto h-11 md:h-12 rounded-full">
                <Link href="/about-us">Learn More</Link>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in px-4 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-yellow-200">
                <Gift className="w-3 h-3 md:w-4 md:h-4 text-orange-500 flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-purple-900 whitespace-nowrap">Best Deals</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-purple-200">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-purple-900 whitespace-nowrap">Quality Assured</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-pink-200">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-pink-500 flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-purple-900 whitespace-nowrap">Fast Delivery</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm rounded-full shadow-lg shadow-red-500/30 border-2 border-red-400">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-white fill-white flex-shrink-0 animate-pulse" />
                <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">Trusted by 1000s</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products - Carousel with Enhanced Cards */}
      <section id="featured-products" className="py-10 md:py-16 px-4 md:px-6 scroll-mt-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-3 md:mb-4 animate-fade-in-up">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg animate-fade-in-up delay-200 px-2">
              Hover to explore our exclusive collection
            </p>
          </div>
          
          {/* Enhanced Product Carousel */}
          <div className="relative pt-8 pb-8">
            <ProductCarousel 
              products={products.slice(0, 8)} 
              renderCard={(product, index) => (
                <div className="group cursor-pointer h-full px-2 py-2">
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border-4 transition-all duration-500 group-hover:border-purple-400 group-hover:shadow-purple-300/50 group-hover:-translate-y-3 h-full"
                    style={{
                      borderColor: index % 5 === 0 ? 'rgb(192, 132, 252)' : index % 5 === 1 ? 'rgb(251, 146, 60)' : index % 5 === 2 ? 'rgb(236, 72, 153)' : index % 5 === 3 ? 'rgb(168, 85, 247)' : 'rgb(249, 115, 22)'
                    }}
                  >
                    {/* Badge */}
                    {index === 0 && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-bounce">
                          ⭐ TOP PICK
                        </div>
                      </div>
                    )}
                    
                    {/* Product Image */}
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-3 transition-all">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>
                        <Link href={`/products/${product.id}`}>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 md:py-8 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card
              className="p-6 text-center border-4 border-purple-300 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/50 hover:border-purple-400 rounded-3xl"
              style={{
                animation: 'flipInX 0.8s ease-out',
                animationDelay: '0ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-blue-500/30">
                  <Truck className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-lg font-heading font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Fast Delivery</h3>
                <p className="text-gray-700 text-sm font-medium">
                  Get your products delivered quickly and safely to your doorstep
                </p>
              </div>
            </Card>

            <Card
              className="p-6 text-center border-4 border-green-300 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-300/50 hover:border-green-400 rounded-3xl"
              style={{
                animation: 'flipInX 0.8s ease-out',
                animationDelay: '150ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-green-500/30">
                  <Headphones className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-lg font-heading font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">24/7 Support</h3>
                <p className="text-gray-700 text-sm font-medium">
                  Our customer support team is always here to help you
                </p>
              </div>
            </Card>

            <Card
              className="p-6 text-center border-4 border-pink-300 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-300/50 hover:border-pink-400 rounded-3xl"
              style={{
                animation: 'flipInX 0.8s ease-out',
                animationDelay: '300ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-purple-500/30">
                  <ShieldCheck className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-lg font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Quality Guarantee</h3>
                <p className="text-gray-700 text-sm font-medium">
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