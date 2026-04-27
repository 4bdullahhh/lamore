import { X } from "lucide-react";
import { Product } from "@/src/lib/constants";
import { cn } from "@/src/lib/utils";

interface SmellStoryModalProps {
  product: Product | null;
  onClose: () => void;
}

export const SmellStoryModal = ({ product, onClose }: SmellStoryModalProps) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
      <div
        className="fixed inset-0 bg-brand-bg/95 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      />

      <div className="relative glass w-full max-w-5xl rounded-[2rem] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 fade-in duration-700">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-brand-gold hover:text-brand-bg transition-all"
        >
          <X size={24} />
        </button>

        {/* Visual Side */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto relative bg-brand-bg">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-overlay opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-transparent hidden lg:block" />

          <div className="absolute bottom-12 left-12">
            <p className="text-brand-gold uppercase tracking-[0.5em] text-xs mb-2">{product.house}</p>
            <h2 className="text-5xl lg:text-7xl font-display font-bold leading-tight">{product.name}</h2>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex-1 p-8 lg:p-16 flex flex-col gap-12 overflow-y-auto">
          <div>
            <h3 className="text-sm uppercase tracking-[0.3em] text-brand-gold mb-6 border-b border-brand-gold/20 pb-2 inline-block">The Story</h3>
            <p className="text-lg lg:text-xl font-light leading-relaxed font-sans text-brand-text/80">{product.description}</p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.3em] text-brand-gold mb-8 border-b border-brand-gold/20 pb-2 inline-block">Olfactory Pyramid</h3>
            <div className="flex flex-col gap-8">
              {(["top", "heart", "base"] as const).map((level) => (
                <div key={level} className="flex items-start gap-6 group">
                  <div className="text-[10px] uppercase tracking-widest text-brand-gold w-16 pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    {level}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.notes
                      .filter((n) => n.level === level)
                      .map((note) => (
                        <span
                          key={note.name}
                          className="px-5 py-2 glass rounded-full text-sm font-medium border-brand-gold/10 hover:border-brand-gold/40 transition-colors"
                        >
                          {note.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-brand-gold opacity-50 mb-2">Occasion</h4>
              <p className="font-sans text-sm">Signature / Evening / Special Event</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-brand-gold opacity-50 mb-2">Sillage</h4>
              <p className="font-sans text-sm">Strong & Long Lasting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
