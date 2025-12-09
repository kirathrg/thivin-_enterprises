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
        <div className="min-h-screen bg-light-neutral overflow-x-hidden w-full">
            {/* Hero Section - Full Screen with Banner Background */}
            <section className="relative overflow-hidden bg-gray-900 w-full max-w-[100vw] min-h-[calc(100vh-4rem)] md:h-screen flex items-center box-border">
                {/* Hero Banner Carousel as Background with Dynamic Content */}
                <HeroBannerCarousel />
            </section>

            {/* Featured Products - Carousel with Enhanced Cards */}
            <section id="featured-products" className="py-10 md:py-16 px-4 md:px-6 scroll-mt-16 bg-white overflow-hidden w-full max-w-[100vw]">
                <div className="max-w-7xl mx-auto w-full max-w-[calc(100vw-2rem)]">
                    <div className="mb-8 md:mb-12 text-center">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-charcoal mb-3 md:mb-4 animate-fade-in-up">
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
                                    <div
                                        className="relative overflow-hidden rounded-xl bg-white shadow-md border-0 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2 h-full"
                                        style={{
                                            borderColor: index % 5 === 0 ? 'rgb(192, 132, 252)' : index % 5 === 1 ? 'rgb(251, 146, 60)' : index % 5 === 2 ? 'rgb(236, 72, 153)' : index % 5 === 3 ? 'rgb(168, 85, 247)' : 'rgb(249, 115, 22)'
                                        }}
                                    >
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
                                                <h3 className="text-lg md:text-xl font-bold text-charcoal mb-2 group-hover:text-dusty-rose transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-3 transition-all">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Price and Button - Stack on mobile, side by side on desktop */}
                                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                                <span className="text-xl md:text-2xl font-bold text-dusty-rose">
                                                    ₹{product.price.toLocaleString()}
                                                </span>
                                                <Link href={`/products/${product.id}`} className="w-full md:w-auto">
                                                    <Button className="w-full md:w-auto bg-dusty-rose hover:bg-dusty-rose/90 text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 rounded-md h-10">
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

                    {/* View More Button */}
                    <div className="flex justify-center mt-8">
                        <Button asChild size="lg" className="bg-dusty-rose hover:bg-dusty-rose/90 text-white px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all rounded-md">
                            <Link href="/products">View More Products</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-6 md:py-8 px-4 md:px-6 overflow-hidden bg-light-neutral w-full max-w-[100vw]">
                <div className="max-w-7xl mx-auto w-full max-w-[calc(100vw-2rem)]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <Card
                            className="p-6 text-center border-0 bg-white group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
                            style={{
                                animation: 'flipInX 0.8s ease-out',
                                animationDelay: '0ms'
                            }}
                        >
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 transition-all duration-300 group-hover:scale-110 shadow-md">
                                    <Truck className="h-8 w-8 text-charcoal transition-transform duration-300 group-hover:scale-125" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-charcoal mb-2">Fast Delivery</h3>
                                <p className="text-gray-700 text-sm font-medium">
                                    Get your products delivered quickly and safely to your doorstep
                                </p>
                            </div>
                        </Card>

                        <Card
                            className="p-6 text-center border-0 bg-white group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
                            style={{
                                animation: 'flipInX 0.8s ease-out',
                                animationDelay: '150ms'
                            }}
                        >
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 transition-all duration-300 group-hover:scale-110 shadow-md">
                                    <Headphones className="h-8 w-8 text-charcoal transition-transform duration-300 group-hover:scale-125" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-charcoal mb-2">24/7 Support</h3>
                                <p className="text-gray-700 text-sm font-medium">
                                    Our customer support team is always here to help you
                                </p>
                            </div>
                        </Card>

                        <Card
                            className="p-6 text-center border-0 bg-white group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
                            style={{
                                animation: 'flipInX 0.8s ease-out',
                                animationDelay: '300ms'
                            }}
                        >
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dusty-rose/20 mb-4 transition-all duration-300 group-hover:scale-110 shadow-md">
                                    <ShieldCheck className="h-8 w-8 text-dusty-rose transition-transform duration-300 group-hover:scale-125" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-charcoal mb-2">Quality Guarantee</h3>
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