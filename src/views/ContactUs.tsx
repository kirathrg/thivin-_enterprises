"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

interface AnimatedBoxProps {
  children: React.ReactNode;
  direction: "left" | "right";
  delay?: number;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ children, direction, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

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

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={boxRef}
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

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-alabaster via-sage-light to-secondary pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us through any of the following channels.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Contact Information
          </h2>
          
          {/* Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AnimatedBox direction="left">
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="w-7 h-7 text-dusty-rose" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Email Us</h3>
                </div>
                <p className="text-gray-600 mb-2">Send us an email anytime</p>
                <a
                  href="mailto:info@thivinenterprises.com"
                  className="text-sage hover:text-sage/90 font-medium text-lg"
                >
                  info@thivinenterprises.com
                </a>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="right">
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Support Email</h3>
                </div>
                <p className="text-gray-600 mb-2">For product support and queries</p>
                <a
                  href="mailto:support@thivinenterprises.com"
                  className="text-green-600 hover:text-green-700 font-medium text-lg"
                >
                  support@thivinenterprises.com
                </a>
              </div>
            </AnimatedBox>
          </div>

          {/* Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedBox direction="left" delay={200}>
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="w-7 h-7 text-dusty-rose" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
                </div>
                <p className="text-gray-600 mb-2">Mon-Fri 9am to 6pm</p>
                <a
                  href="tel:+911234567890"
                  className="text-sage hover:text-sage/90 font-medium text-lg"
                >
                  +91 123 456 7890
                </a>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="right" delay={200}>
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Showroom</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  456 Shopping Complex<br />
                  Koramangala, Bengaluru<br />
                  Karnataka 560034, India
                </p>
              </div>
            </AnimatedBox>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Connect With Us
          </h2>
          
          {/* Social Media Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AnimatedBox direction="left" delay={600}>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Facebook className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Facebook</h3>
                </div>
                <p className="text-white/80 mb-3">Follow us for updates and offers</p>
                <a
                  href="https://facebook.com/thivinenterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white font-medium hover:underline"
                >
                  @thivinenterprises
                </a>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="right" delay={600}>
              <div className="bg-dusty-rose rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Instagram className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Instagram</h3>
                </div>
                <p className="text-white/80 mb-3">See our latest products and stories</p>
                <a
                  href="https://instagram.com/thivinenterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white font-medium hover:underline"
                >
                  @thivinenterprises
                </a>
              </div>
            </AnimatedBox>
          </div>

          {/* Social Media Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedBox direction="left" delay={800}>
              <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Twitter className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Twitter</h3>
                </div>
                <p className="text-sky-100 mb-3">Get real-time updates and news</p>
                <a
                  href="https://twitter.com/thivinenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white font-medium hover:underline"
                >
                  @thivinenter
                </a>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="right" delay={800}>
              <div className="bg-charcoal rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Let's Connect!
                  </h3>
                  <p className="text-white/80">
                    We're always happy to help and hear from you.
                  </p>
                </div>
              </div>
            </AnimatedBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
