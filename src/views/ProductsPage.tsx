"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearch } from "@/context/SearchContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ProductsPage = () => {
  const { searchQuery } = useSearch(); // Get search query from context

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center justify-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          Our Products
        </h1>
        <p className="text-gray-600 mb-4">Discover our premium collection</p>
        <Badge variant="secondary" className="text-base px-4 py-1.5">{filteredProducts.length} Products Available</Badge>
      </div>
      
      {filteredProducts.length === 0 ? (
        <p className="text-center text-xl text-gray-600 animate-fade-in">No products found matching "{searchQuery}".</p>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="featured" className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
              {filteredProducts.slice(0, 3).map((product, index) => (
                <div key={product.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProductsPage;