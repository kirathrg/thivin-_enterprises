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
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Our Products
      </h1>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No products found matching "{searchQuery}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;