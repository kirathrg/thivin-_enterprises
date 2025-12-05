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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore, selectCartTotal, selectCartItemCount } from "@/store/useCartStore";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeItem, updateQuantity } = useCartStore();
  const cartTotal = useCartStore(selectCartTotal);
  const cartItemCount = useCartStore(selectCartItemCount);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            Your Cart
            <Badge className="ml-2 bg-blue-600 text-xs sm:text-sm">{cartItemCount}</Badge>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-3 sm:my-4" />
        <ScrollArea className="flex-1 pr-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base line-clamp-1">{item.name}</h3>
                      <p className="text-blue-600 font-medium">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <Badge variant="secondary" className="px-3">{item.quantity}</Badge>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          )}
        </ScrollArea>
        <SheetFooter className="flex flex-col gap-4 p-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
            <span>Total:</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>
          {cartItems.length === 0 ? (
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button
              asChild
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white"
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