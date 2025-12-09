"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, selectCartTotal } from "@/store/useCartStore";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Edit, CheckCircle, Package, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { initiateRazorpayPayment } from "@/lib/razorpay";

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const cartTotal = useCartStore(selectCartTotal);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    total: number;
    address: typeof shippingDetails;
    method: string;
  } | null>(null);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "KIRATHVIGNAN",
    address: "C-15, Wireman Road, Block - 17",
    city: "NEYVELI",
    state: "TAMIL NADU",
    zip: "607801",
    country: "India",
  });

  const handleAddressUpdate = () => {
    if (
      !shippingDetails.fullName ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.zip
    ) {
      toast.error("Please fill in all address details.");
      return;
    }
    setIsEditingAddress(false);
    toast.success("Address updated successfully!");
  };

  const handlePaymentSubmit = async () => {
    if (isProcessing) return;
    
    // Validate address
    if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip) {
      toast.error("Please fill in all address details.");
      return;
    }

    setIsProcessing(true);
    toast.loading("Creating order...", { id: "payment-processing" });

    try {
      // Create Razorpay order on backend
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      
      let createOrderResponse;
      try {
        createOrderResponse = await fetch(`${apiBaseUrl}/razorpay/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: cartTotal,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
          }),
        });
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error(
          fetchError instanceof Error 
            ? `Failed to connect to backend: ${fetchError.message}` 
            : 'Failed to connect to backend. Please ensure the backend server is running on http://localhost:8000'
        );
      }

      if (!createOrderResponse.ok) {
        const errorText = await createOrderResponse.text();
        let errorMessage = 'Failed to create order';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const orderData = await createOrderResponse.json();
      toast.dismiss("payment-processing");

      // Initiate Razorpay payment
      await initiateRazorpayPayment(
        {
          id: orderData.id,
          amount: orderData.amount,
          currency: orderData.currency,
          key_id: orderData.key_id,
        },
        {
          name: 'Thivin Enterprises',
          description: `Order for ${cartItems.length} item(s)`,
          prefill: {
            name: shippingDetails.fullName,
            email: '', // You can add email field if needed
            contact: '', // You can add phone field if needed
          },
          onSuccess: async (paymentId, orderId, signature) => {
            try {
              // Verify payment on backend
              let verifyResponse;
              try {
                verifyResponse = await fetch(`${apiBaseUrl}/razorpay/verify-payment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    razorpay_order_id: orderId,
                    razorpay_payment_id: paymentId,
                    razorpay_signature: signature,
                  }),
                });
              } catch (fetchError) {
                console.error('Verify payment fetch error:', fetchError);
                throw new Error(
                  fetchError instanceof Error 
                    ? `Failed to verify payment: ${fetchError.message}` 
                    : 'Failed to connect to backend for payment verification'
                );
              }

              if (!verifyResponse.ok) {
                const errorText = await verifyResponse.text();
                let errorMessage = 'Payment verification failed';
                try {
                  const errorData = JSON.parse(errorText);
                  errorMessage = errorData.error || errorMessage;
                } catch {
                  errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
              }

              const verifyData = await verifyResponse.json();
              
              if (verifyData.success) {
                // Generate order ID
                const finalOrderId = `ORD${Date.now()}`;
                
                // Save order details
                setOrderDetails({
                  orderId: finalOrderId,
                  total: cartTotal,
                  address: { ...shippingDetails },
                  method: 'razorpay',
                });
                
                clearCart();
                setOrderConfirmed(true);
                toast.success("Payment successful! Order placed.");
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              toast.error(error instanceof Error ? error.message : 'Payment verification failed');
              setIsProcessing(false);
            }
          },
          onError: (error) => {
            // Check if user cancelled the payment
            if (error === 'Payment cancelled by user' || error.includes('cancelled')) {
              toast.info('Payment cancelled. You can try again when ready.');
              setIsProcessing(false);
            } else {
              console.error('Payment error:', error);
              toast.error(error);
              setIsProcessing(false);
            }
          },
        }
      );
    } catch (error) {
      toast.dismiss("payment-processing");
      console.error('Order creation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create order');
      setIsProcessing(false);
    }
  };

  // Show confirmation page after order is placed
  if (orderConfirmed && orderDetails) {

    return (
      <div className="w-full min-h-[calc(100vh-64px)] bg-white relative z-10">
        <div className="container mx-auto px-4 py-4 md:px-8 md:py-8 max-w-3xl">
          <Card className="text-center shadow-lg border-gray-200">
            <CardHeader className="pb-6">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-6">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl text-gray-900 mb-2">
                Order Placed Successfully!
              </CardTitle>
              <p className="text-gray-600">
                Thank you for your purchase from Thivin Enterprises
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Details */}
              <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-semibold text-gray-900">{orderDetails.orderId}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-gray-900">₹{orderDetails.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold text-gray-900">
                    Razorpay (Online Payment)
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Delivery Address</span>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{orderDetails.address.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {orderDetails.address.address}<br />
                      {orderDetails.address.city}, {orderDetails.address.state}<br />
                      {orderDetails.address.zip}, {orderDetails.address.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="flex items-center justify-center gap-2 text-gray-700 bg-blue-50 p-4 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
                <p>Your order will be processed and shipped shortly</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                >
                  <Link href="/">Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
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
      <div className="container mx-auto px-4 py-4 md:px-8 md:py-8 max-w-6xl">
        <Button asChild variant="ghost" className="mb-6 hover:bg-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Section - Address & Payment */}
          <div className="md:col-span-2 space-y-6">
            {/* Address Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <CardTitle className="text-lg text-gray-900">
                      Delivering to {shippingDetails.fullName}
                    </CardTitle>
                  </div>
                  <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
                    <Button variant="outline" size="sm" onClick={() => setIsEditingAddress(true)}>
                      <Edit className="h-4 w-4 mr-1" /> Change
                    </Button>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Shipping Address</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddressUpdate} className="grid gap-4 pt-4">
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
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={shippingDetails.state}
                              onChange={(e) =>
                                setShippingDetails({ ...shippingDetails, state: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={shippingDetails.country}
                              onChange={(e) =>
                                setShippingDetails({ ...shippingDetails, country: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                          Save Address
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {shippingDetails.address}<br />
                  {shippingDetails.city}, {shippingDetails.state} - {shippingDetails.zip}<br />
                  {shippingDetails.country}
                </p>
              </CardContent>
            </Card>

            {/* Payment Method Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 border rounded-lg p-4 bg-gray-50">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Razorpay Online Payment</p>
                    <p className="text-xs text-gray-500">Secure payment via Razorpay - UPI, Cards, Net Banking & more</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  You will be redirected to Razorpay's secure payment page to complete your transaction.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Order Summary */}
          <div className="md:col-span-1">
            <Card className="shadow-sm border-gray-200 sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({cartItems.length})</span>
                  <span className="font-medium text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Order Total</span>
                    <span className="text-lg font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  onClick={handlePaymentSubmit} 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessing}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing ? "Processing..." : "Proceed to Payment"}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  By placing your order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;