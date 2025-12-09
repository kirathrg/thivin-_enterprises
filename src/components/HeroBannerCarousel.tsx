"use client";

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Banner data with product information
const banners = [
    {
        id: 0,
        type: 'brand' as const,
        image: '/banners/mobile/product-1.jpg', // Use a nice background for brand slide
        mobileImage: '/banners/mobile/product-1.jpg',
        alt: 'Thivin Enterprises - Quality Home Appliances',
        title: 'Thivin Enterprises',
        description: 'Your one-stop shop for quality home appliances and combo packs.',
        productId: null,
    },
    {
        id: 1,
        type: 'product' as const,
        image: '/banners/mobile/product-3.jpg',
        mobileImage: '/banners/mobile/product-3.jpg',
        alt: 'Household Facilitation Pack',
        title: 'Household Facilitation Pack',
        description: 'The ultimate home setup kit. Perfect for new families.',
        price: 5000,
        productId: '1',
    },
    {
        id: 2,
        type: 'product' as const,
        image: '/banners/mobile/product-2.jpg',
        mobileImage: '/banners/mobile/product-2.jpg',
        alt: 'Essential Living Bundle',
        title: 'Essential Living Bundle',
        description: 'Daily essentials to beat the heat and keep the kitchen running.',
        price: 5000,
        productId: '2',
    },
    {
        id: 3,
        type: 'product' as const,
        image: '/banners/mobile/product-1.jpg',
        mobileImage: '/banners/mobile/product-1.jpg',
        alt: 'Kitchen Starter Combo',
        title: 'Kitchen Starter Combo',
        description: 'High-quality basics for every kitchen.',
        price: 9999,
        productId: '3',
    },
];

export default function HeroBannerCarousel() {
    const [isMobile, setIsMobile] = React.useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
    });

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const currentBanner = banners[selectedIndex];

    return (
        <>
            {/* Full-screen Background Carousel */}
            <div className="absolute inset-0 overflow-hidden w-full h-full" ref={emblaRef}>
                <div className="flex h-full w-full max-w-full">
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className="flex-[0_0_100%] min-w-0 relative h-full w-full"
                        >
                            {banner.type === 'brand' ? (
                                /* Warm light-themed animated background with visible animations */
                                <div className="absolute inset-0 w-full h-full overflow-hidden">
                                    {/* Warm cream/beige base gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F5] via-[#FAF0EB] to-[#F5E6DE]" />

                                    {/* Animated diagonal stripes */}
                                    <div
                                        className="absolute inset-0 opacity-[0.08]"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, #C4847A 30px, #C4847A 32px)',
                                            animation: 'slideStripes 20s linear infinite'
                                        }}
                                    />

                                    {/* Large floating soft circles */}
                                    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-dusty-rose/40 to-pink-300/25 blur-2xl"
                                        style={{ animation: 'float 8s ease-in-out infinite' }} />
                                    <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-200/50 to-amber-100/40 blur-2xl"
                                        style={{ animation: 'float 10s ease-in-out infinite reverse' }} />

                                    {/* Animated pulsing rings */}
                                    <div className="absolute top-1/4 right-[20%] w-40 h-40 border-4 border-dusty-rose/30 rounded-full"
                                        style={{ animation: 'pulseRing 3s ease-out infinite' }} />
                                    <div className="absolute top-1/4 right-[20%] w-40 h-40 border-4 border-dusty-rose/20 rounded-full"
                                        style={{ animation: 'pulseRing 3s ease-out infinite', animationDelay: '1s' }} />
                                    <div className="absolute top-1/4 right-[20%] w-40 h-40 border-4 border-dusty-rose/10 rounded-full"
                                        style={{ animation: 'pulseRing 3s ease-out infinite', animationDelay: '2s' }} />

                                    {/* Floating geometric shapes */}
                                    <div className="absolute top-[15%] right-[30%] w-20 h-20 border-2 border-dusty-rose/40 rotate-45 rounded-lg"
                                        style={{ animation: 'floatRotate 12s linear infinite' }} />
                                    <div className="absolute bottom-[25%] right-[15%] w-16 h-16 bg-terracotta/15 rounded-xl"
                                        style={{ animation: 'float 6s ease-in-out infinite' }} />
                                    <div className="absolute top-[60%] right-[35%] w-12 h-12 border-2 border-orange-300/30 rounded-full"
                                        style={{ animation: 'floatRotate 15s linear infinite reverse' }} />

                                    {/* Moving dots trail */}
                                    <div className="absolute top-[40%] right-[10%] flex flex-col gap-4">
                                        <div className="w-3 h-3 bg-dusty-rose/50 rounded-full" style={{ animation: 'bounce 2s ease-in-out infinite' }} />
                                        <div className="w-3 h-3 bg-dusty-rose/40 rounded-full" style={{ animation: 'bounce 2s ease-in-out infinite', animationDelay: '0.2s' }} />
                                        <div className="w-3 h-3 bg-dusty-rose/30 rounded-full" style={{ animation: 'bounce 2s ease-in-out infinite', animationDelay: '0.4s' }} />
                                    </div>

                                    {/* Animated horizontal wave line */}
                                    <svg className="absolute bottom-[30%] right-0 w-full h-20 opacity-20" preserveAspectRatio="none">
                                        <path
                                            d="M0,10 Q50,0 100,10 T200,10 T300,10 T400,10 T500,10 T600,10 T700,10 T800,10 T900,10 T1000,10 T1100,10 T1200,10 T1300,10 T1400,10 T1500,10"
                                            stroke="#C4847A"
                                            strokeWidth="3"
                                            fill="none"
                                            style={{ animation: 'waveMove 4s linear infinite' }}
                                        />
                                    </svg>

                                    {/* Soft sparkles with visible pulse */}
                                    <div className="absolute top-[20%] right-[25%] w-4 h-4 bg-dusty-rose rounded-full animate-ping opacity-60" style={{ animationDuration: '2s' }} />
                                    <div className="absolute top-[50%] right-[40%] w-3 h-3 bg-terracotta rounded-full animate-ping opacity-50" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                                    <div className="absolute top-[35%] right-[12%] w-4 h-4 bg-orange-300 rounded-full animate-ping opacity-60" style={{ animationDuration: '2s', animationDelay: '1s' }} />
                                    <div className="absolute top-[70%] right-[50%] w-3 h-3 bg-rose-300 rounded-full animate-ping opacity-50" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
                                </div>
                            ) : (
                                /* Product image for product slides */
                                <Image
                                    src={isMobile ? banner.mobileImage : banner.image}
                                    alt={banner.alt}
                                    fill
                                    className="object-cover object-center w-full h-full"
                                    priority={banner.id === 1}
                                    sizes="100vw"
                                    quality={90}
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 pointer-events-none" />

            {/* Dynamic Content Overlay */}
            <div className="absolute inset-0 z-10 flex items-center">
                <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
                    <div className="text-left max-w-2xl">
                        {/* Animated Title - Slides from left with blur */}
                        <h1
                            key={`title-${selectedIndex}`}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold drop-shadow-2xl leading-tight text-white mb-4 md:mb-6 opacity-0 animate-hero-title"
                        >
                            {currentBanner.title}
                        </h1>

                        {/* Description - Bounces up */}
                        <p
                            key={`desc-${selectedIndex}`}
                            className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-lg mb-6 md:mb-8 leading-relaxed max-w-xl opacity-0 animate-hero-text"
                            style={{ animationDelay: '0.15s' }}
                        >
                            {currentBanner.description}
                        </p>

                        {/* Price Tag for Products - Scale bounce */}
                        {currentBanner.type === 'product' && currentBanner.price && (
                            <div
                                key={`price-${selectedIndex}`}
                                className="mb-6 opacity-0 animate-hero-price"
                                style={{ animationDelay: '0.3s' }}
                            >
                                <span className="text-2xl md:text-3xl font-bold text-dusty-rose drop-shadow-lg">
                                    ₹{currentBanner.price.toLocaleString()}
                                </span>
                            </div>
                        )}

                        {/* CTA Buttons - Staggered bounce up */}
                        <div
                            key={`cta-${selectedIndex}`}
                            className="flex flex-col sm:flex-row gap-3 md:gap-4"
                        >
                            {currentBanner.type === 'brand' ? (
                                <>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-dusty-rose hover:bg-dusty-rose/90 text-white px-8 md:px-10 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-0 h-12 md:h-14 rounded-md opacity-0 animate-hero-button"
                                        style={{ animationDelay: '0.4s' }}
                                    >
                                        <Link href="/products">Shop Now</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 md:px-10 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-white h-12 md:h-14 rounded-md opacity-0 animate-hero-button"
                                        style={{ animationDelay: '0.5s' }}
                                    >
                                        <Link href="/about-us">Learn More</Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-dusty-rose hover:bg-dusty-rose/90 text-white px-8 md:px-10 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-0 h-12 md:h-14 rounded-md opacity-0 animate-hero-button"
                                        style={{ animationDelay: '0.4s' }}
                                    >
                                        <Link href={`/products/${currentBanner.productId}`} className="flex items-center gap-2">
                                            View Details
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 md:px-10 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-white h-12 md:h-14 rounded-md opacity-0 animate-hero-button"
                                        style={{ animationDelay: '0.5s' }}
                                    >
                                        <Link href="/products">View All Products</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrow - Right side only, hidden on mobile */}
            <button
                onClick={scrollNext}
                className="hidden md:block absolute right-8 md:right-20 top-1/2 -translate-y-1/2 z-20 group animate-pulse"
                aria-label="Next slide"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.4))' }}
            >
                <svg
                    width="80"
                    height="40"
                    viewBox="0 0 80 40"
                    fill="none"
                    className="transition-all duration-500 group-hover:translate-x-2 group-hover:animate-none"
                >
                    {/* Arrow tail (line) */}
                    <line
                        x1="0"
                        y1="20"
                        x2="65"
                        y2="20"
                        stroke="white"
                        strokeWidth="2"
                        className="transition-all duration-500 group-hover:stroke-[3]"
                    />
                    {/* Arrow head (top line) */}
                    <line
                        x1="65"
                        y1="10"
                        x2="75"
                        y2="20"
                        stroke="white"
                        strokeWidth="2"
                        className="transition-all duration-500 group-hover:stroke-[3]"
                    />
                    {/* Arrow head (bottom line) */}
                    <line
                        x1="65"
                        y1="30"
                        x2="75"
                        y2="20"
                        stroke="white"
                        strokeWidth="2"
                        className="transition-all duration-500 group-hover:stroke-[3]"
                    />
                </svg>
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-16 md:bottom-20 left-0 right-0 flex justify-center gap-2 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                            ? 'w-8 bg-white shadow-lg'
                            : 'w-2.5 bg-white/60 hover:bg-white/80'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </>
    );
}
