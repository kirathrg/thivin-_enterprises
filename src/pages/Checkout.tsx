"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shippingDetails.fullName ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.zip
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvv
    ) {
      toast.error("Please fill in all payment details.");
      return;
    }
    // Simulate payment processing
    toast.loading("Processing payment...", { id: "payment-processing" });
    setTimeout(() => {
      toast.dismiss("payment-processing");
      toast.success("Payment successful!");
      clearCart();
      setStep(3);
    }, 2000);
  };

  if (cartItems.length === 0 && step < 3) {
    return (
      <div className="container mx-auto p-4 text-center min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)] animate-fade-in">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-8 animate-fade-in-down">Checkout</h1>

      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0 animate-[slideUp_0.6s_ease-out]">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShippingSubmit} className="grid gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={shippingDetails.fullName}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingDetails.address}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingDetails.city}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input
                      id="zip"
                      value={shippingDetails.zip}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, zip: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all">
                  Proceed to Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0 animate-[slideUp_0.6s_ease-out]">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className="grid gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                    }
                    required
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                      }
                      required
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentDetails.cvv}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                      }
                      required
                      placeholder="XXX"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center text-xl font-bold mt-4">
                  <span>Order Total:</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all">
                  Place Order
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  Back to Shipping
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="text-center p-8 shadow-2xl bg-white/90 backdrop-blur-sm border-0 animate-[bounceIn_0.8s_ease-out]">
            <CardHeader>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 relative" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-gray-700">
                Thank you for your purchase from Thivin Enterprises.
              </p>
              <p className="text-md text-gray-600">
                Your order will be processed and shipped shortly.
              </p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white mt-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Checkout;