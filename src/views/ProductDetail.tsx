"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, ShoppingCart, Package, CheckCircle } from "lucide-react";

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  const { addItem } = useCartStore();

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
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <Button asChild variant="ghost" className="mb-6 hover:bg-gray-100">
        <Link href="/products" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </Card>
        
        <div className="flex flex-col gap-6">
          <div>
            <Badge className="mb-4 bg-primary">Featured Product</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-semibold text-gray-900">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
          
          <Separator />
          
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <CardDescription className="text-gray-700 leading-relaxed text-base">{product.description}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="h-5 w-5 text-primary" />
                Items Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {product.itemsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-white"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;