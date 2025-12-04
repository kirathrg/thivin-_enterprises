"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, MapPin, LogOut, User as UserIcon } from "lucide-react";

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 text-center min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please log in to view your profile.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Welcome, {user?.name || "User"}!
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="flex flex-col items-center text-center p-6">
          <UserIcon className="h-12 w-12 text-blue-600 mb-4" />
          <CardTitle className="text-xl mb-2">Account Details</CardTitle>
          <CardContent className="p-0">
            <p className="text-gray-700">Name: {user?.name}</p>
            <p className="text-gray-700">Email: {user?.email}</p>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center text-center p-6">
          <Package className="h-12 w-12 text-blue-600 mb-4" />
          <CardTitle className="text-xl mb-2">My Orders</CardTitle>
          <CardContent className="p-0">
            <p className="text-gray-600">No orders placed yet.</p>
            <Button variant="link" asChild className="text-blue-600 hover:text-blue-700 mt-2">
              <Link href="/">Shop Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center text-center p-6">
          <MapPin className="h-12 w-12 text-blue-600 mb-4" />
          <CardTitle className="text-xl mb-2">Saved Addresses</CardTitle>
          <CardContent className="p-0">
            <p className="text-gray-600">No saved addresses.</p>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 mt-2">
              Add Address
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 col-span-full lg:col-span-1 lg:col-start-2">
          <LogOut className="h-12 w-12 text-red-600 mb-4" />
          <CardTitle className="text-xl mb-2">Logout</CardTitle>
          <CardContent className="p-0">
            <Button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white">
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;