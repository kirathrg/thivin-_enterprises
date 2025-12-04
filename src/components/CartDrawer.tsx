"use client";

import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeItem, updateQuantity, cartTotal, cartItemCount } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-blue-600">
            Your Cart ({cartItemCount})
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle className="h-5 w-5 text-blue-600" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusCircle className="h-5 w-5 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="flex flex-col gap-4 p-4 border-t">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>
          {cartItems.length === 0 ? (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/checkout" onClick={onClose}>
                Proceed to Checkout
              </Link>
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;