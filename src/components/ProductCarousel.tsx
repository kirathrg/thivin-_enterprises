"use client";

import React from "react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};

export default ProductCarousel;