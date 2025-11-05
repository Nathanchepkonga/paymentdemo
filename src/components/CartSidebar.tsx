import { CartItem } from "@/types/payment";
import { Button } from "./ui/button";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { Badge } from "./ui/badge";

interface CartSidebarProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onClose?: () => void;
}

export const CartSidebar = ({ items, onUpdateQuantity, onRemove, onCheckout, onClose }: CartSidebarProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-card rounded-xl shadow-[var(--shadow-card)] p-6 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-card-foreground">Cart</h2>
          {itemCount > 0 && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              {itemCount}
            </Badge>
          )}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg bg-secondary/30"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate text-card-foreground">{item.name}</h3>
                  <p className="text-sm font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto"
                      onClick={() => onRemove(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-card-foreground">${total.toFixed(2)}</span>
            </div>
            <Button 
              variant="accent" 
              className="w-full" 
              size="lg"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
