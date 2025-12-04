"use client";

import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
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
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <Button asChild variant="ghost" className="mb-6 text-blue-600 hover:text-blue-700">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          {/* Image Placeholder: Replace with actual product image */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-3xl font-semibold text-blue-600">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Items Included:
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {product.itemsIncluded.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
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