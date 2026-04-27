import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { Product } from "@/src/lib/constants";
import { formatPKR, cn } from "@/src/lib/utils";

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
}

export const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const total = items.reduce((acc, item) => {
    const price = item.size === "Full Bottle"
      ? item.product.priceFull
      : item.product.priceDecant[item.size as keyof typeof item.product.priceDecant];
    return acc + price * item.quantity;
  }, 0);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-brand-bg border-l border-white/5 z-[101] shadow-2xl transition-transform duration-500 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-brand-gold" size={24} />
            <h2 className="text-2xl font-display font-medium uppercase tracking-widest">Your Cart</h2>
          </div>
          <button onClick={onClose} className="hover:text-brand-gold transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-6 opacity-40">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="font-sans tracking-widest uppercase text-sm text-center">Your sanctuary of scent is empty</p>
              <button
                onClick={onClose}
                className="px-8 py-3 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-brand-bg transition-all"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => {
              const price = item.size === "Full Bottle"
                ? item.product.priceFull
                : item.product.priceDecant[item.size as keyof typeof item.product.priceDecant];

              return (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-6 group">
                  <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/5">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-overlay" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display text-lg tracking-wide">{item.product.name}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-brand-gold opacity-80">{item.size}</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.product.id, item.size)}
                        className="text-brand-text/30 hover:text-brand-rose transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-brand-gold font-medium">{formatPKR(price)}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border border-white/10 rounded overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="p-1 px-2 hover:bg-white/5 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="p-1 px-2 hover:bg-white/5 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t border-white/5 bg-white/[0.02]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm uppercase tracking-widest opacity-60">Subtotal</span>
              <span className="text-2xl font-display font-bold text-brand-gold">{formatPKR(total)}</span>
            </div>
            <button className="w-full py-5 bg-brand-gold text-brand-bg font-sans font-bold uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-brand-bg transition-colors shadow-[0_10px_30px_rgba(201,169,110,0.2)]">
              Proceed to checkout
            </button>
            <p className="text-center text-[9px] uppercase tracking-widest opacity-40 mt-6 mt-4">
              All imports are 100% authentic. Ships across Pakistan.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
