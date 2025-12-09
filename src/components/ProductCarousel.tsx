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
      className="w-full max-w-6xl mx-auto px-12 md:px-16 max-w-[calc(100vw-2rem)] overflow-visible"
    >
      <CarouselContent className="-ml-3 md:-ml-4 py-2">
        {products.map((product, index) => (
          <CarouselItem
            key={product.id}
            className="pl-3 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 md:animate-fade-in-up"
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
      <CarouselPrevious className="left-0 md:left-2 top-1/2 -translate-y-1/2 hover:scale-110 transition-all bg-white hover:bg-white shadow-lg border-2 border-gray-200 hover:border-dusty-rose text-charcoal hover:text-dusty-rose z-10 h-10 w-10 md:h-12 md:w-12" />
      <CarouselNext className="right-0 md:right-2 top-1/2 -translate-y-1/2 hover:scale-110 transition-all bg-white hover:bg-white shadow-lg border-2 border-gray-200 hover:border-dusty-rose text-charcoal hover:text-dusty-rose z-10 h-10 w-10 md:h-12 md:w-12" />
    </Carousel>
  );
};

export default ProductCarousel;