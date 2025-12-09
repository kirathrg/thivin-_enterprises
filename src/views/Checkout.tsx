"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore, selectCartTotal } from "@/store/useCartStore";
import { useAuthStore, Address } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, CreditCard, Smartphone, Wallet, Building2, Banknote, CheckCircle, Package, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddressForm from "@/components/AddressForm";

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const { isAuthenticated, user, addAddress, getDefaultAddress } = useAuthStore();
  const cartTotal = useCartStore(selectCartTotal);
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isSelectingAddress, setIsSelectingAddress] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    total: number;
    address: Address;
    method: string;
  } | null>(null);
  const hasCheckedAuth = useRef(false);

  // Check authentication on mount
  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    if (!isAuthenticated) {
      toast.error("Please sign in to proceed to checkout");
      router.push("/");
      return;
    }

    // Load default address or first address
    const defaultAddr = getDefaultAddress();
    if (defaultAddr) {
      setSelectedAddress(defaultAddr);
    } else if (user?.addresses && user.addresses.length > 0) {
      setSelectedAddress(user.addresses[0]);
    }
  }, [isAuthenticated, router, getDefaultAddress, user]);

  const handleAddAddress = (address: Omit<Address, 'id'>) => {
    addAddress(address);
    setIsAddingAddress(false);
    // Select the newly added address
    setTimeout(() => {
      const newAddr = getDefaultAddress();
      if (newAddr) {
        setSelectedAddress(newAddr);
      }
    }, 100);
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsSelectingAddress(false);
  };

  const handlePaymentSubmit = () => {
    if (!selectedAddress) {
      toast.error("Please add a delivery address.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    // Integrate with Razorpay here
    toast.loading("Processing payment...", { id: "payment-processing" });
    setTimeout(() => {
      toast.dismiss("payment-processing");
      toast.success("Payment successful!");

      // Generate order ID
      const orderId = `ORD${Date.now()}`;

      // Save order details
      setOrderDetails({
        orderId,
        total: cartTotal,
        address: selectedAddress,
        method: paymentMethod,
      });

      clearCart();
      setOrderConfirmed(true);
    }, 2000);
  };

  // Show confirmation page after order is placed
  if (orderConfirmed && orderDetails) {
    const paymentMethodNames: Record<string, string> = {
      upi: "UPI / QR",
      card: "Credit / Debit Card",
      cod: "Cash on Delivery",
      netbanking: "Net Banking",
      wallet: "Razorpay Wallet",
    };

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
                    {paymentMethodNames[orderDetails.method]}
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
              <div className="flex items-center justify-center gap-2 text-gray-700 bg-gray-100 p-4 rounded-lg">
                <Package className="h-5 w-5 text-dusty-rose" />
                <p>Your order will be processed and shipped shortly</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-dusty-rose hover:bg-dusty-rose/90 text-white rounded-md"
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
          <Button asChild className="bg-dusty-rose hover:bg-dusty-rose/90 text-white rounded-md">
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
                      Delivery Address
                    </CardTitle>
                  </div>
                  {selectedAddress && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSelectingAddress(true)}
                    >
                      Change
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {selectedAddress ? (
                  <div>
                    <p className="font-semibold text-gray-900">{selectedAddress.fullName}</p>
                    <p className="text-sm text-gray-700 leading-relaxed mt-2">
                      {selectedAddress.address}<br />
                      {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zip}<br />
                      {selectedAddress.country}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">No address found</p>
                    <Button
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-dusty-rose hover:bg-dusty-rose/90 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method Section */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {/* UPI Payment */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5 text-dusty-rose" />
                      <div>
                        <p className="font-medium text-gray-900">UPI / QR</p>
                        <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm & more</p>
                      </div>
                    </Label>
                  </div>

                  {/* Credit/Debit Card */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-dusty-rose" />
                      <div>
                        <p className="font-medium text-gray-900">Credit / Debit Card</p>
                        <p className="text-xs text-gray-500">Visa, Mastercard, Amex, RuPay & more</p>
                      </div>
                    </Label>
                  </div>

                  {/* Cash on Delivery */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Banknote className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Cash on Delivery</p>
                        <p className="text-xs text-gray-500">Pay when you receive</p>
                      </div>
                    </Label>
                  </div>

                  {/* Net Banking */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Building2 className="h-5 w-5 text-dusty-rose" />
                      <div>
                        <p className="font-medium text-gray-900">Net Banking</p>
                        <p className="text-xs text-gray-500">All major banks supported</p>
                      </div>
                    </Label>
                  </div>

                  {/* Razorpay Wallet */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-gray-900">Razorpay Wallet</p>
                        <p className="text-xs text-gray-500">Fast & secure payments</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
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
                  className="w-full bg-dusty-rose hover:bg-dusty-rose/90 text-white rounded-md"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Place Order
                </Button>
                <p className="text-xs text-center text-gray-500">
                  By placing your order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Address Selection Dialog */}
      <Dialog open={isSelectingAddress} onOpenChange={setIsSelectingAddress}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Delivery Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {user?.addresses && user.addresses.length > 0 ? (
              <>
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => handleSelectAddress(address)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedAddress?.id === address.id
                      ? 'border-dusty-rose bg-dusty-rose/5'
                      : 'hover:border-gray-400'
                      }`}
                  >
                    <p className="font-semibold text-gray-900">{address.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {address.address}, {address.city}, {address.state} - {address.zip}
                    </p>
                    {address.isDefault && (
                      <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                ))}
                <Button
                  onClick={() => {
                    setIsSelectingAddress(false);
                    setIsAddingAddress(true);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No addresses found</p>
                <Button
                  onClick={() => {
                    setIsSelectingAddress(false);
                    setIsAddingAddress(true);
                  }}
                  className="bg-dusty-rose hover:bg-dusty-rose/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Address Dialog */}
      <AddressForm
        isOpen={isAddingAddress}
        onClose={() => setIsAddingAddress(false)}
        onSubmit={handleAddAddress}
        mode="add"
      />
    </div>
  );
};

export default Checkout;