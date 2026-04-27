import { useState, useEffect, useRef } from "react";
import { ArrowDown, Instagram, Mail, MessageCircle, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

import { PRODUCTS, Product } from "./lib/constants";
import { cn, formatPKR } from "./lib/utils";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Bottle3D } from "./components/Bottle3D";
import { ProductCard } from "./components/ProductCard";
import { CartDrawer } from "./components/CartDrawer";
import { SmellStoryModal } from "./components/SmellStoryModal";

gsap.registerPlugin(ScrollTrigger);

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<"All" | "Men" | "Women" | "Unisex">("All");

  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-p', scrollPercent.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initial Reveal
    const ctx = gsap.context(() => {
      // Hero headline reveal
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
      });

      // Section reveal triggers
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        gsap.from(section.querySelectorAll(".reveal"), {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
          },
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Parallax scroll on hero
      gsap.to(".hero-parallax", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: (i, target) => {
          const speed = target.dataset.speed || 0.5;
          return window.innerHeight * speed;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id && item.size === size
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === id && item.size === size)));
  };

  const filteredProducts = PRODUCTS.filter(
    (p) => activeFilter === "All" || p.gender === activeFilter
  );

  return (
    <div className="bg-brand-bg text-brand-text font-sans min-h-screen selection:bg-brand-gold selection:text-brand-bg">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-brand-bg flex items-center justify-center"
          >
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-4xl lg:text-6xl font-display font-bold tracking-[0.5em] text-brand-gold uppercase"
              >
                My Lamore
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-[1px] bg-brand-gold/30 mt-8 mx-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 w-full h-[2px] bg-brand-gold/20 z-[100]">
        <motion.div
          className="h-full bg-brand-gold"
          style={{
            scaleX: typeof window !== "undefined" ? undefined : 0,
            transformOrigin: "left"
          }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: "var(--scroll-p, 0)"
          }}
        />
      </div>

      {/* Background Animated Mesh */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-rose/5 blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <CustomCursor />
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative h-screen flex flex-col items-center lg:items-start justify-center overflow-hidden">
        <Bottle3D />

        <div className="relative z-10 px-6 lg:px-24 max-w-7xl w-full">
          <div className="hero-text flex items-center space-x-4 mb-8">
            <div className="w-12 h-[1px] bg-brand-gold"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">The Pakistani Parfumerie</span>
          </div>

          <h1 className="hero-text text-[80px] md:text-[120px] lg:text-[160px] font-display font-bold leading-[0.85] text-white overflow-hidden tracking-tighter">
            WEAR <br />
            <span className="text-brand-gold italic">YOUR</span> <br />
            DESIRE
          </h1>
          
          <p className="hero-text text-lg md:text-xl font-light mt-10 opacity-70 max-w-sm leading-relaxed text-left">
            Imported luxury fragrances and artisan decants from the world's most prestigious houses.
          </p>

          <div className="hero-text flex flex-col sm:flex-row items-center lg:items-start gap-6 mt-12">
            <a
              href="#collection"
              className="px-10 py-5 bg-brand-gold text-brand-bg font-bold uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-[#b8985d] hover:shadow-[0_0_40px_rgba(201,169,110,0.4)] text-center leading-none flex items-center"
            >
              Explore Collection
            </a>
            <a
              href="#decants"
              className="px-10 py-5 border border-brand-gold/30 hover:bg-brand-gold/5 transition-colors uppercase tracking-[0.3em] text-[10px] font-bold text-center leading-none flex items-center"
            >
              Order Decant
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 opacity-40 animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-[10px] uppercase tracking-widest vertical-text">Scroll to discover</span>
          <ArrowDown size={14} />
        </div>
      </section>

      {/* Marquee Strip */}
      <section ref={marqueeRef} className="h-16 border-y border-white/10 bg-brand-bg overflow-hidden whitespace-nowrap flex items-center">
        <div className="flex animate-marquee items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex gap-20 px-8 items-center text-[11px] uppercase tracking-[0.4em] font-medium min-w-[100vw]">
              <span className="flex items-center opacity-60 flex-shrink-0"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> AUTHENTIC IMPORTS</span>
              <span className="flex items-center opacity-60 flex-shrink-0"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> PREMIUM DECANTS</span>
              <span className="flex items-center opacity-60 flex-shrink-0"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> NATIONWIDE DELIVERY</span>
              <span className="flex items-center opacity-60 flex-shrink-0"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> WORLDWIDE HOUSES</span>
              <span className="flex items-center opacity-60 flex-shrink-0"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> MY LAMORE</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section id="collection" ref={collectionRef} className="py-32 px-6 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="reveal text-sm uppercase tracking-[0.5em] text-brand-gold mb-6">The Collection</h2>
          <h3 className="reveal text-4xl lg:text-6xl font-display font-bold">Featured Originals</h3>
        </div>

        {/* Filter Tabs */}
        <div className="reveal flex justify-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {(["All", "Men", "Women", "Unisex"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-8 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300",
                activeFilter === filter
                  ? "bg-brand-gold text-brand-bg font-bold"
                  : "border border-white/10 hover:border-brand-gold/50 text-white/60"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard
                  product={p}
                  onAddToCart={addToCart}
                  onOpenStory={setSelectedProduct}
                  type="full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Decants Section */}
      <section id="decants" className="py-32 px-6 lg:px-24 bg-white/[0.02]">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="reveal text-sm uppercase tracking-[0.5em] text-brand-rose mb-6">Taste before you commit</h2>
            <h3 className="reveal text-4xl lg:text-6xl font-display font-bold">The Luxury of Choice</h3>
            <p className="reveal text-brand-text/60 mt-6 leading-relaxed font-sans font-light">
              We believe luxury should be accessible. Experience the world's most desired fragrances through our artisan decants,
              meticulously poured into premium glass vials. Starting from just {formatPKR(850)}.
            </p>
          </div>
          <button className="reveal px-10 py-4 border border-brand-rose text-brand-rose hover:bg-brand-rose hover:text-brand-bg transition-all uppercase tracking-widest text-xs">
            Learn about decanting
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={`${p.id}-decant`} className="reveal">
              <ProductCard
                product={p}
                onAddToCart={addToCart}
                onOpenStory={setSelectedProduct}
                type="decant"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 overflow-hidden border-y border-white/5">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-sm uppercase tracking-[0.5em] text-brand-gold mb-6">Voices of Desire</h2>
          <h3 className="text-4xl lg:text-6xl font-display font-bold">What Our Collectors Say</h3>
        </div>

        <div className="flex animate-marquee-slower gap-8 py-10">
          {[
            { name: "Ahmed R.", city: "Lahore", review: "The Baccarat Rouge decant was the real deal. Packaging was secure and delivery was fast.", rating: 5 },
            { name: "Sana K.", city: "Karachi", review: "Love Don't Be Shy is my new signature scent. So glad I could try a 5ml decant before committing.", rating: 5 },
            { name: "Bilal M.", city: "Islamabad", review: "Authentic stuff. Sauvage EDP smells exactly like the one I got from UK.", rating: 4 },
            { name: "Zoya H.", city: "Faisalabad", review: "My Lamore is my go-to store for perfumes now. High quality and great prices.", rating: 5 },
            { name: "Hamza S.", city: "Peshawar", review: "Impressive sillage on the decants. Will be ordering full bottles soon.", rating: 5 },
          ].map((t, idx) => (
            <div key={idx} className="w-[400px] flex-shrink-0 glass p-10 rounded-3xl flex flex-col gap-6">
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-brand-gold">★</span>
                ))}
              </div>
              <p className="text-lg font-display italic text-brand-text/80">"{t.review}"</p>
              <div>
                <p className="font-bold tracking-widest uppercase text-xs">{t.name}</p>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest">{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {[
            { step: "01", title: "Browse", desc: "Explore our curated collection of imported masterpieces." },
            { step: "02", title: "Select", desc: "Choose a full bottle or try a variety of decant sizes." },
            { step: "03", title: "Experience", desc: "Receive your order in 2-3 days anywhere in Pakistan." },
          ].map((item) => (
            <div key={item.step} className="reveal group">
              <span className="text-8xl font-display font-bold text-brand-gold/10 group-hover:text-brand-gold/30 transition-colors duration-500">
                {item.step}
              </span>
              <h4 className="text-3xl font-display font-medium -mt-10 mb-4">{item.title}</h4>
              <p className="font-sans font-light text-brand-text/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 lg:px-24 bg-white/[0.01]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1605613303666-6b2c28659bcc?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60"
              alt="Luxury Essence"
            />
            <div className="absolute inset-0 border-[20px] border-brand-bg rounded-[2rem]" />
          </div>
          <div>
            <h2 className="reveal text-sm uppercase tracking-[0.5em] text-brand-gold mb-6">Our Legacy</h2>
            <h3 className="reveal text-5xl lg:text-7xl font-display font-medium mb-10 leading-tight">The Art of <br /> Invisible Luxury</h3>
            <p className="reveal text-lg font-sans font-light leading-relaxed text-brand-text/70 mb-12">
              My Lamore was born from a single obsession — to make the world's finest fragrances accessible to every Pakistani who dares to dream in scent.
              We believe that a perfume is more than just a liquid; it's a memory, a mood, and a bold statement of identity.
            </p>
            <div className="reveal grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-2">Authenticity</h4>
                <p className="text-sm font-light opacity-60">100% genuine imports. No middleman, no replicas.</p>
              </div>
              <div>
                <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-2">Passion</h4>
                <p className="text-sm font-light opacity-60">Curated by connoisseurs for the discerning soul.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-24">
        <div className="glass rounded-[3rem] p-12 lg:p-24 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8">Personal <br /> Concierge</h2>
              <p className="text-lg opacity-60 mb-12">Need help picking your perfect scent? Our fragrance experts are here to guide you.</p>

              <div className="flex flex-col gap-6">
                <a href="#" className="flex items-center gap-4 text-xl hover:text-brand-gold transition-colors">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-green-500">
                    <MessageCircle size={20} fill="currentColor" />
                  </div>
                  Order on WhatsApp
                </a>
                <a href="#" className="flex items-center gap-4 text-xl hover:text-brand-gold transition-colors">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-pink-400">
                    <Instagram size={20} />
                  </div>
                  Follow the Story
                </a>
                <a href="#" className="flex items-center gap-4 text-xl hover:text-brand-gold transition-colors">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-brand-gold">
                    <Mail size={20} />
                  </div>
                  concierge@mylamore.pk
                </a>
              </div>
            </div>

            <form className="flex flex-col gap-6">
              <input type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-2xl p-6 font-sans focus:border-brand-gold outline-none transition-colors" />
              <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-2xl p-6 font-sans focus:border-brand-gold outline-none transition-colors" />
              <textarea placeholder="Tell us your fragrance preference..." rows={4} className="bg-white/5 border border-white/10 rounded-2xl p-6 font-sans focus:border-brand-gold outline-none transition-colors" />
              <button className="py-6 bg-brand-gold text-brand-bg font-bold uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-3 hover:bg-white transition-colors group">
                Send Inquiry <Send size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[120px] pointer-events-none" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 lg:px-24 border-t border-white/5 opacity-80">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xs">
            <h3 className="text-3xl font-display font-medium text-brand-gold tracking-widest mb-6 uppercase">MY LAMORE</h3>
            <p className="text-sm font-light leading-relaxed opacity-60">
              The premier destination for luxury international fragrances in Pakistan. Spanning the bridge between global elegance and local accessibility.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-brand-gold">Shop</h4>
              <ul className="flex flex-col gap-4 text-xs font-light tracking-widest opacity-60">
                <li><a href="#" className="hover:opacity-100">All Fragrances</a></li>
                <li><a href="#" className="hover:opacity-100">For Men</a></li>
                <li><a href="#" className="hover:opacity-100">For Women</a></li>
                <li><a href="#" className="hover:opacity-100">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-brand-gold">Company</h4>
              <ul className="flex flex-col gap-4 text-xs font-light tracking-widest opacity-60">
                <li><a href="#" className="hover:opacity-100">Our Story</a></li>
                <li><a href="#" className="hover:opacity-100">Authenticity</a></li>
                <li><a href="#" className="hover:opacity-100">Shipping</a></li>
                <li><a href="#" className="hover:opacity-100">Returns</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-[10px] uppercase tracking-widest opacity-40">© 2025 My Lamore — All fragrances are 100% authentic imports.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Components */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <SmellStoryModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-slower {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-slower {
          animation: marquee-slower 80s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
