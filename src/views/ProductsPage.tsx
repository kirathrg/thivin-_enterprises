"use client";

import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearch } from "@/context/SearchContext"; // Import useSearch

const ProductsPage = () => {
  const { searchQuery } = useSearch(); // Get search query from context

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent -z-10"></div>
      <div className="absolute top-10 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-[floatSlow_8s_ease-in-out_infinite]"></div>
      
      {/* Decorative dots */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-[pulse_4s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-sky-400 rounded-full animate-[pulse_3.5s_ease-in-out_infinite]"></div>
      
      <h1 className="relative text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-12 animate-fade-in-down z-10">
        Our Products
      </h1>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-xl text-gray-600 animate-fade-in">No products found matching "{searchQuery}".</p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {filteredProducts.map((product, index) => (
              <div key={product.id} style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;