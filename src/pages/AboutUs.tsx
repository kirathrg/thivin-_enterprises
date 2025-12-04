"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Award, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="relative container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)] animate-fade-in overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent -z-10"></div>
      <div className="absolute top-10 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-[floatSlow_8s_ease-in-out_infinite]"></div>
      
      {/* Decorative dots */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-[pulse_4s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-sky-400 rounded-full animate-[pulse_3.5s_ease-in-out_infinite]"></div>
      
      <h1 className="relative text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-8 animate-fade-in-down z-10">
        About Thivin Enterprises
      </h1>

      <div className="relative max-w-3xl mx-auto space-y-8 z-10">
        <Card className="hover-lift bg-white/90 backdrop-blur-sm shadow-lg border-0 animate-[slideUp_0.6s_ease-out]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Our Story</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-700 leading-relaxed">
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

        <Card className="hover-lift bg-white/90 backdrop-blur-sm shadow-lg border-0 animate-[slideUp_0.6s_ease-out]" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">Our Commitment to Quality</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-700 leading-relaxed">
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

        <Card className="hover-lift bg-white/90 backdrop-blur-sm shadow-lg border-0 animate-[slideUp_0.6s_ease-out]" style={{animationDelay: '0.4s'}}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent">Customer Satisfaction</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-700 leading-relaxed">
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
      </div>
    </div>
  );
};

export default AboutUs;