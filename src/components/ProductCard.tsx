"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleBuyNow = () => {
    addItem(product);
    router.push('/checkout');
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-500 border-4 border-purple-300 bg-white group h-full md:hover:shadow-2xl md:hover:shadow-purple-300/50 md:hover:-translate-y-3 md:hover:border-purple-400 rounded-3xl">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 md:group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover transition-all duration-700 md:group-hover:scale-110"
        />
      </Link>
      <CardHeader className="flex-grow pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-6">
        <CardTitle className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 leading-snug md:group-hover:text-purple-600 transition-colors">
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow-0 pt-0 px-3 md:px-6">
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ₹{product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="pt-3 md:pt-4 px-3 md:px-6 pb-3 md:pb-6">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center gap-2 h-9 md:h-10 text-sm md:text-base transition-all duration-300 md:hover:scale-105 md:hover:shadow-lg active:scale-95 rounded-full"
          >
            View More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;