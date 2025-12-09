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
    <Card className="flex flex-col overflow-hidden transition-all duration-300 border-0 bg-white group h-full md:hover:shadow-lg md:hover:-translate-y-2 rounded-xl">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 md:group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover transition-all duration-700 md:group-hover:scale-110"
        />
      </Link>
      <CardHeader className="flex-grow pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-6">
        <CardTitle className="text-base md:text-lg font-semibold text-charcoal line-clamp-2 leading-snug md:group-hover:text-dusty-rose transition-colors">
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </CardHeader>
      <CardContent className="flex-grow-0 pt-2 md:pt-0 px-3 md:px-6 pb-2">
        <p className="text-lg md:text-2xl font-bold text-dusty-rose">
          ₹{product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="pt-2 md:pt-4 px-3 md:px-6 pb-4 md:pb-6">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button
            className="w-full bg-dusty-rose hover:bg-dusty-rose/90 text-white flex items-center justify-center gap-2 h-10 md:h-10 text-sm md:text-base transition-all duration-300 active:scale-95 rounded-md"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;