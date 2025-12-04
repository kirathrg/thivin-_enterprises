"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-500 border-gray-200 bg-white group h-full md:hover:shadow-2xl md:hover:-translate-y-2 md:hover:scale-[1.02] md:hover:rotate-1">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover transition-all duration-500 md:group-hover:scale-110 md:group-hover:rotate-2"
        />
      </Link>
      <CardHeader className="flex-grow pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-6">
        <CardTitle className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow-0 pt-0 px-3 md:px-6">
        <p className="text-xl md:text-2xl font-bold text-gray-900">
          ₹{product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="pt-3 md:pt-4 px-3 md:px-6 pb-3 md:pb-6">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 h-9 md:h-10 text-sm md:text-base transition-all duration-300 md:hover:scale-105 md:hover:shadow-lg active:scale-95"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform md:group-hover:rotate-12" /> 
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;