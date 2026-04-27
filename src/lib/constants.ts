export type PerfumeNote = {
  name: string;
  level: "top" | "heart" | "base";
};

export type Product = {
  id: string;
  name: string;
  house: string;
  tagline: string;
  description: string;
  priceFull: number;
  priceDecant: {
    "2ml": number;
    "5ml": number;
    "10ml": number;
  };
  rating: number;
  gender: "Men" | "Women" | "Unisex";
  image: string;
  notes: PerfumeNote[];
};

export const PRODUCTS: Product[] = [
  {
    id: "dior-sauvage",
    name: "Dior Sauvage EDP",
    house: "House of Dior",
    tagline: "Wild. Magnetic. Undeniable.",
    description: "A radically fresh composition, Dior Sauvage is both raw and noble. Radiant top notes burst with the juicy freshness of Reggio di Calabria Bergamot.",
    priceFull: 45000,
    priceDecant: { "2ml": 1200, "5ml": 2800, "10ml": 5200 },
    rating: 4.8,
    gender: "Men",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Bergamot", level: "top" },
      { name: "Sichuan Pepper", level: "heart" },
      { name: "Ambroxan", level: "base" }
    ]
  },
  {
    id: "acqua-di-gio",
    name: "Acqua di Giò Profondo",
    house: "Giorgio Armani",
    tagline: "Depth of the ocean, spirit of the sky.",
    description: "Profondo is the intense marine interpretation of Acqua di Giò. More than a fragrance, Aqua di Giò Profondo is a captivating deep-dive into the profoundness of the soul.",
    priceFull: 38000,
    priceDecant: { "2ml": 1100, "5ml": 2500, "10ml": 4800 },
    rating: 4.7,
    gender: "Men",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Marine Notes", level: "top" },
      { name: "Rosemary", level: "heart" },
      { name: "Patchouli", level: "base" }
    ]
  },
  {
    id: "gucci-guilty",
    name: "Gucci Guilty Pour Homme",
    house: "Gucci",
    tagline: "Rebel with a luxurious soul.",
    description: "A contemporary take on two iconic perfumery ingredients popular in the 1970s, top notes of Rose and Chili Pepper create an unexpected and invigorating retro vibe.",
    priceFull: 35000,
    priceDecant: { "2ml": 950, "5ml": 2200, "10ml": 4200 },
    rating: 4.5,
    gender: "Men",
    image: "https://images.unsplash.com/photo-1557170334-a7c3a1fcf5af?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Rose", level: "top" },
      { name: "Chili Pepper", level: "heart" },
      { name: "Cedarwood", level: "base" }
    ]
  },
  {
    id: "love-dont-be-shy",
    name: "Love Don't Be Shy",
    house: "Kilian Paris",
    tagline: "Sweet seduction in every drop.",
    description: "First launched in 2007, Love, Don’t Be Shy was conceived as an olfactory treat. An opening as sweet as orange blossom, followed by warm marshmallows.",
    priceFull: 75000,
    priceDecant: { "2ml": 2500, "5ml": 5800, "10ml": 11000 },
    rating: 4.9,
    gender: "Women",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Neroli", level: "top" },
      { name: "Marshmallow", level: "heart" },
      { name: "Vanilla", level: "base" }
    ]
  },
  {
    id: "baccarat-rouge",
    name: "Baccarat Rouge 540",
    house: "Maison Francis Kurkdjian",
    tagline: "The scent of pure opulence.",
    description: "Luminous and sophisticated, Baccarat Rouge 540 lays on the skin like an amber, floral and woody breeze. A poetic alchemy.",
    priceFull: 95000,
    priceDecant: { "2ml": 3500, "5ml": 8200, "10ml": 15500 },
    rating: 5.0,
    gender: "Unisex",
    image: "https://images.unsplash.com/photo-1583445013765-d1c20e4a5b5b?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Saffron", level: "top" },
      { name: "Amberwood", level: "heart" },
      { name: "Cedar Resin", level: "base" }
    ]
  },
  {
    id: "bleu-chanel",
    name: "Bleu de Chanel EDP",
    house: "Chanel",
    tagline: "Freedom. Boldness. Chanel.",
    description: "The most intense of the BLEU DE CHANEL fragrances. Powerful and refined, BLEU DE CHANEL Parfum reveals the essence of determination.",
    priceFull: 42000,
    priceDecant: { "2ml": 1500, "5ml": 3500, "10ml": 6500 },
    rating: 4.8,
    gender: "Men",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Lemon Zest", level: "top" },
      { name: "Lavender", level: "heart" },
      { name: "Sandalwood", level: "base" }
    ]
  },
  {
    id: "black-opium",
    name: "YSL Black Opium",
    house: "Yves Saint Laurent",
    tagline: "Dark. Addictive. Electric.",
    description: "The first floral coffee fragrance by YSL. A shot of adrenaline, for the most addictive signature fragrance.",
    priceFull: 32000,
    priceDecant: { "2ml": 900, "5ml": 2000, "10ml": 3800 },
    rating: 4.6,
    gender: "Women",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Black Coffee", level: "top" },
      { name: "White Flowers", level: "heart" },
      { name: "Vanilla", level: "base" }
    ]
  },
  {
    id: "spicebomb-extreme",
    name: "Viktor & Rolf Spicebomb Extreme",
    house: "Viktor & Rolf",
    tagline: "An explosion of warm spice.",
    description: "An even more explosive version of the original. More spicy, more intense, Spicebomb Extreme is a fragrance for men who want to stand out.",
    priceFull: 29000,
    priceDecant: { "2ml": 850, "5ml": 1800, "10ml": 3400 },
    rating: 4.7,
    gender: "Men",
    image: "https://images.unsplash.com/photo-1615368144595-5cc8902506f3?q=80&w=800&auto=format&fit=crop",
    notes: [
      { name: "Black Pepper", level: "top" },
      { name: "Cumin", level: "heart" },
      { name: "Tobacco", level: "base" }
    ]
  }
];
