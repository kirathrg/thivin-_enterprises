"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearchStore } from "@/store/useSearchStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ProductsPage = () => {
  const { searchQuery } = useSearchStore(); // Get search query from store

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-light-neutral relative z-10">
      <div className="container mx-auto px-4 py-4 md:px-8 md:py-8">
        <div className="flex flex-col items-center justify-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-charcoal mb-4">
          Our Products
        </h1>
        <p className="text-gray-600 mb-4">Discover our premium collection</p>
        <Badge className="text-base px-4 py-1.5 bg-dusty-rose text-white">{filteredProducts.length} Products Available</Badge>
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
    </div>
  );
};

export default ProductsPage;