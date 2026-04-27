import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar = ({ cartCount, onOpenCart }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Collection", href: "#collection" },
    { name: "Decants", href: "#decants" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 px-6 lg:px-12 flex items-center justify-between border-b",
        isScrolled ? "bg-brand-bg/80 backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"
      )}
    >
      {/* Brand */}
      <a href="#hero" className="text-xl lg:text-2xl font-display font-bold tracking-[0.4em] uppercase text-brand-gold">
        MY LAMORE
      </a>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-light tracking-[0.2em] uppercase hover:text-brand-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="hidden sm:block hover:text-brand-gold transition-colors">
          <Search size={22} strokeWidth={1.5} />
        </button>
        <button
          onClick={onOpenCart}
          className="relative hover:text-brand-gold transition-colors"
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button
          className="lg:hidden hover:text-brand-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-brand-bg z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-700",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <button
          className="absolute top-8 right-8 text-brand-gold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-display tracking-widest uppercase text-brand-text hover:text-brand-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};
