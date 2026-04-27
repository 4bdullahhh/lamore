import React, { useState, useRef } from "react";
import { Star, Plus, Eye } from "lucide-react";
import { Product } from "@/src/lib/constants";
import { cn, formatPKR } from "@/src/lib/utils";
import gsap from "gsap";

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, size: string) => void;
  onOpenStory: (p: Product) => void;
  type?: "full" | "decant";
}

export const ProductCard = ({ product, onAddToCart, onOpenStory, type = "full" }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(type === "full" ? "Full Bottle" : "2ml");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const currentPrice = type === "full"
    ? product.priceFull
    : product.priceDecant[selectedSize as keyof typeof product.priceDecant];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      className="group relative glass rounded-2xl p-6 flex flex-col gap-6 transform-gpu transition-all duration-300 hover:border-brand-gold/40 hover:shadow-[0_0_50px_rgba(201,169,110,0.1)]"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-brand-bg to-brand-gold/10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />

        {/* Floating Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={() => onOpenStory(product)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-gold hover:text-brand-bg transition-colors"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-1">{product.house}</p>
            <h3 className="text-xl font-display font-medium tracking-wide">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-brand-gold">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-sans">{product.rating}</span>
          </div>
        </div>
        <p className="text-xs text-brand-text/60 italic font-light">"{product.tagline}"</p>
      </div>

      {/* Size Selector for Decants */}
      {type === "decant" && (
        <div className="flex gap-2">
          {Object.keys(product.priceDecant).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-3 py-1 text-[10px] uppercase tracking-widest border transition-all duration-300 rounded-full",
                selectedSize === size
                  ? "border-brand-gold bg-brand-gold text-brand-bg"
                  : "border-white/10 hover:border-brand-gold/50"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      {/* Bottom */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
        <span className="text-lg font-medium text-brand-gold">{formatPKR(currentPrice)}</span>
        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="group/btn relative px-6 py-3 bg-brand-gold text-brand-bg font-sans font-bold text-[10px] uppercase tracking-[0.2em] overflow-hidden transition-transform active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Add to Cart <Plus size={14} />
          </span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 opacity-20" />
        </button>
      </div>

      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-brand-gold/0 group-hover:border-brand-gold/20 transition-colors duration-500" />
    </div>
  );
};
