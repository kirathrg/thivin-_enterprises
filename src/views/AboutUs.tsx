"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Award, Users } from "lucide-react";

interface AnimatedCardProps {
  children: React.ReactNode;
  direction: "left" | "right";
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, direction, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100"
          : direction === "left"
          ? "md:-translate-x-full -translate-x-0 opacity-0"
          : "md:translate-x-full translate-x-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About Thivin Enterprises
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Building trust through quality products and exceptional service
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatedCard direction="left">
          <Card className="hover:shadow-lg transition-shadow border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <span className="text-gray-900">Our Story</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base text-gray-700 leading-relaxed">
            <p className="mb-4">
              Thivin Enterprises was founded with a simple yet powerful vision:
              to bring high-quality, essential home appliances and combo packs
              to every household. We understand the needs of modern families and
              strive to provide solutions that simplify daily life, enhance comfort,
              and offer exceptional value.
            </p>
            <p>
              From kitchen essentials to home comfort devices, our curated
              selection is designed to meet diverse requirements, ensuring that
              you find exactly what you need to make your house a home.
            </p>
          </CardContent>
        </Card>
        </AnimatedCard>

        <AnimatedCard direction="right" delay={200}>
          <Card className="hover:shadow-lg transition-shadow border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <span className="text-gray-900">Our Commitment to Quality</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base text-gray-700 leading-relaxed">
            <p className="mb-4">
              Quality is at the heart of everything we do. We meticulously
              select products from trusted manufacturers, ensuring durability,
              efficiency, and safety. Our combo packs are thoughtfully assembled
              to provide comprehensive solutions, saving you time and effort in
              setting up your home.
            </p>
            <p>
              We believe that every product you purchase from Thivin Enterprises
              should be an investment in comfort and convenience, built to last
              and perform reliably for years to come.
            </p>
          </CardContent>
        </Card>
        </AnimatedCard>

        <AnimatedCard direction="left" delay={400}>
          <Card className="hover:shadow-lg transition-shadow border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-gray-900">Customer Satisfaction</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base text-gray-700 leading-relaxed">
            <p className="mb-4">
              Your satisfaction is our top priority. We are dedicated to
              providing an exceptional shopping experience, from easy navigation
              on our website to prompt delivery and responsive customer support.
              Our team is always ready to assist you with any queries or concerns.
            </p>
            <p>
              Join the growing family of happy customers who trust Thivin
              Enterprises for their home appliance needs. We look forward to
              serving you!
            </p>
          </CardContent>
        </Card>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default AboutUs;