"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Product Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">
          The product you are looking for does not exist.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)] animate-fade-in">
      <Button asChild variant="ghost" className="mb-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
        <Link href="/products" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center animate-slide-in-left">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="relative w-full max-w-md h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 animate-slide-in-right">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{product.name}</h1>
          <p className="text-3xl font-semibold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Items Included:
            </h2>
            <ul className="space-y-2">
              {product.itemsIncluded.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mt-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;