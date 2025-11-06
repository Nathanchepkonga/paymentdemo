import { useState } from "react";
import { Product, CartItem } from "@/types/payment";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { CheckoutModal } from "@/components/CheckoutModal";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import Logo from "@/Assets/products/Logo.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(true);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success("Quantity updated!");
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success("Added to cart!");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast.success("Removed from cart");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="VukaPay logo" className="h-10 w-10 rounded-md object-contain shadow-sm bg-white/50" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-[hsl(210,90%,50%)] bg-clip-text text-transparent">
                  VukaPay Demo
                </h1>
                <p className="text-sm text-muted-foreground">Payment Demo Store</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCartOpen(!cartOpen)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Powered by</p>
                <p className="text-sm font-semibold text-card-foreground">VukaPay Gateway</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className={`grid gap-8 transition-all duration-300 ${cartOpen ? 'lg:grid-cols-[1fr_320px]' : 'lg:grid-cols-1'}`}>
          {/* Products Grid */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Experience seamless payments across Africa with VukaPay
              </p>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-300 ${!cartOpen ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className={`transition-all duration-300 ease-in-out ${cartOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
            <CartSidebar
              items={cart}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onCheckout={() => setCheckoutOpen(true)}
              onClose={() => setCartOpen(false)}
            />
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} total={total} />

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 VukaPay. Seamless payments across 12+ African countries.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
