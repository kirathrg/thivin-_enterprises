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
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover-lift bg-white/90 backdrop-blur-sm border-0 animate-fade-in">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </Link>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-2">
          <Link href={`/products/${product.id}`} className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:bg-clip-text hover:text-transparent transition-all">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow-0">
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          ₹{product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;