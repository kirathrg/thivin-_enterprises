"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useCartStore, selectCartTotal } from "@/store/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Truck, CreditCard } from "lucide-react";

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const cartTotal = useCartStore(selectCartTotal);
  const router = useRouter();
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
      <div className="w-full min-h-[calc(100vh-64px)] bg-white relative z-10">
        <div className="container mx-auto px-4 py-4 text-center flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-white relative z-10">
      <div className="container mx-auto px-4 py-4 md:px-8 md:py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Checkout</h1>
      
      {step < 3 && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant={step >= 1 ? "default" : "outline"} className="flex items-center gap-1">
              <Truck className="h-3 w-3" /> Shipping
            </Badge>
            <Badge variant={step >= 2 ? "default" : "outline"} className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" /> Payment
            </Badge>
            <Badge variant={step >= 3 ? "default" : "outline"} className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Confirmation
            </Badge>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Shipping Address</CardTitle>
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
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Proceed to Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Payment Information</CardTitle>
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
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Place Order
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Back to Shipping
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="text-center p-8 border-gray-200">
            <CardHeader>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-3xl text-gray-900">Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-gray-700">
                Thank you for your purchase from Thivin Enterprises.
              </p>
              <p className="text-base text-gray-600">
                Your order will be processed and shipped shortly.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white mt-6">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
};

export default Checkout;