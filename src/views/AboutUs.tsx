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
      className={`transform transition-all duration-1000 ease-out ${isVisible
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
                <span className="text-gray-900">Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base text-gray-700 leading-relaxed">
              <p className="mb-4">
                To simplify the way households purchase essential products by offering thoughtfully curated combos that deliver convenience, quality, and value. We understand that modern families seek reliable solutions that save time and reduce costs, without compromising on everyday needs.
              </p>
              <p>
                With a strong focus on quality assurance and customer satisfaction, we bring together a wide range of trusted household items packaged into purposeful, affordable combinations. Each combo is carefully assembled to meet practical home requirements while ensuring a seamless and enjoyable shopping experience.
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
                <span className="text-gray-900">Our Commitment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base text-gray-700 leading-relaxed">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-dusty-rose mt-1">•</span>
                  <span>Providing high-quality, dependable household products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-dusty-rose mt-1">•</span>
                  <span>Delivering value through efficient and cost-effective combo offerings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-dusty-rose mt-1">•</span>
                  <span>Ensuring a smooth, intuitive digital shopping journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-dusty-rose mt-1">•</span>
                  <span>Building trust through transparent service and responsive customer support</span>
                </li>
              </ul>
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
                <span className="text-gray-900">Our Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base text-gray-700 leading-relaxed">
              <p className="mb-4">
                Our goal is to create a dependable and user-friendly marketplace where households can access their essential products with confidence and convenience.
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