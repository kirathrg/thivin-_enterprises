"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Award, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        About Thivin Enterprises
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Home className="h-6 w-6 text-blue-600" /> Our Story
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

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Award className="h-6 w-6 text-blue-600" /> Our Commitment to Quality
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

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600" /> Customer Satisfaction
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