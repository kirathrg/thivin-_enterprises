"use client";

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const banners = [
    {
        id: 1,
        image: '/banners/blender.png',
        mobileImage: '/banners/mobile/blender.png',
        alt: 'Premium Blender - Perfect for Smoothies',
    },
    {
        id: 2,
        image: '/banners/mixer.png',
        mobileImage: '/banners/mobile/mixer.png',
        alt: 'Mixer Grinder - Your Kitchen Essential',
    },
    {
        id: 3,
        image: '/banners/toaster.png',
        mobileImage: '/banners/mobile/toaster.png',
        alt: 'Modern Toaster - Perfect Toast Every Time',
    },
    {
        id: 4,
        image: '/banners/microwave.png',
        mobileImage: '/banners/mobile/microwave.png',
        alt: 'Microwave Oven - Quick & Easy Cooking',
    },
];

export default function HeroBannerCarousel() {
    const [isMobile, setIsMobile] = React.useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            skipSnaps: false,
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

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

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

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
                        </div>
                    ))}
                </div>
            </div>

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 pointer-events-none" />

            {/* Navigation Dots - Positioned higher up */}
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
