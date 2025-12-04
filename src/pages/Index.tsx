"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard"; // Keep ProductCard for individual use if needed, but not directly in the grid
import ProductCarousel from "@/components/ProductCarousel"; // Import the new ProductCarousel
import { Truck, Headset, ShieldCheck } from "lucide-react";
import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32 flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
            Thivin Enterprises
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Your one-stop shop for quality home appliances and combo packs.
          </p>
          <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg animate-scale-in">
            <Link to="/">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
          Featured Combo Packs
        </h2>
        <ProductCarousel products={products} /> {/* Use the ProductCarousel here */}
      </section>

      {/* Trust Badges */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-4">
            <Truck className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Shipping</h3>
            <p className="text-gray-600">On all orders above ₹5000</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Headset className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Dedicated customer assistance</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <ShieldCheck className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
            <p className="text-gray-600">100% protected transactions</p>
          </div>
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Index;