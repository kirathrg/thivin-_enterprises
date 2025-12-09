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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore, selectCartTotal, selectCartItemCount } from "@/store/useCartStore";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag, X } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cartItems, removeItem, updateQuantity } = useCartStore();
  const cartTotal = useCartStore(selectCartTotal);
  const cartItemCount = useCartStore(selectCartItemCount);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-charcoal flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-dusty-rose" />
          Your Cart
          <Badge className="ml-2 bg-dusty-rose text-white">{cartItemCount}</Badge>
        </h2>
      </div>
      <Separator className="mb-4" />
      <ScrollArea className="flex-1 pr-4 max-h-[50vh] md:max-h-[60vh]">
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
                    <p className="text-dusty-rose font-medium">₹{item.price.toLocaleString()}</p>
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
      <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 mt-4">
        <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
          <span>Total:</span>
          <span className="text-dusty-rose">₹{cartTotal.toLocaleString()}</span>
        </div>
        {cartItems.length === 0 ? (
          <Button
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            disabled
          >
            Proceed to Checkout
          </Button>
        ) : (
          <Button
            asChild
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Link href="/checkout" onClick={onClose}>
              Proceed to Checkout
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: Use Sheet (side drawer)
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="flex flex-col w-full sm:max-w-lg">
          <CartContent onClose={onClose} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Use Dialog (floating centered modal with rounded corners)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[85vh] rounded-xl shadow-lg border-0 bg-white p-6 flex flex-col overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        <CartContent onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CartDrawer;