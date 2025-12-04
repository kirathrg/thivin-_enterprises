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
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto px-4 md:px-0"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product, index) => (
          <CarouselItem 
            key={product.id} 
            className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
            style={{
              animation: `fadeInSlideUp 0.6s ease-out forwards ${index * 0.1}s`,
              opacity: 0,
            }}
          >
            <div className="p-1 group perspective-1000">
              <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-y-5">
                <ProductCard product={product} />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 hover:scale-110 transition-transform" />
      <CarouselNext className="hidden md:flex absolute right-[-50px] top-1/2 -translate-y-1/2 hover:scale-110 transition-transform" />
    </Carousel>
  );
};

export default ProductCarousel;