"use client";

import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;