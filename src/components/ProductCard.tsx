"use client";

import React from "react";
import { Link } from "react-router-dom";
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
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-2">
          <Link to={`/products/${product.id}`} className="hover:text-blue-600">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow-0">
        <p className="text-2xl font-bold text-blue-600">
          ₹{product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;