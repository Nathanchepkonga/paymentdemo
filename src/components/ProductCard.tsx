import { Product } from "@/types/payment";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square bg-secondary/30 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
          <h3 className="font-semibold text-card-foreground mt-1">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button 
            variant="gradient" 
            size="sm"
            onClick={() => onAddToCart(product)}
            className="gap-1.5"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
