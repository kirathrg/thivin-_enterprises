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
  renderCard?: (product: Product, index: number) => React.ReactNode;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, renderCard }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto px-4 md:px-0 overflow-visible"
    >
      <CarouselContent className="-ml-2 md:-ml-4 overflow-visible py-2">
        {products.map((product, index) => (
          <CarouselItem 
            key={product.id} 
            className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 md:animate-fade-in-up overflow-visible"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }}
          >
            {renderCard ? (
              renderCard(product, index)
            ) : (
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 hover:scale-110 transition-transform" />
      <CarouselNext className="hidden md:flex absolute right-[-50px] top-1/2 -translate-y-1/2 hover:scale-110 transition-transform" />
    </Carousel>
  );
};

export default ProductCarousel;