import forn from "@/assets/forn.jpg";
import barber from "@/assets/barber.jpg";
import tapas from "@/assets/tapas.jpg";
import flors from "@/assets/flors.jpg";
import bici from "@/assets/bici.jpg";

export type Site = {
  slug: string;
  theme: string;
  name: string;
  kind: string;
  barrio: string;
  tagline: string;
  intro: string;
  image: string;
  cta: string;
  services: { name: string; desc: string; price: string }[];
  quotes: { text: string; who: string }[];
  address: string;
  phone: string;
  hours: string[];
};

export const sites: Site[] = [
  {
    slug: "forn-de-gracia",
    theme: "theme-forn",
    name: "Forn de Gràcia",
    kind: "Bakery",
    barrio: "Gràcia",
    tagline: "Bread the slow way, since 1987.",
    intro: "Sourdough fermented for 48 hours, ensaïmadas every morning, and coca de recapte on weekends. A family bakery on the corner of your street.",
    image: forn,
    cta: "Order for pickup",
    services: [
      { name: "Pa de pagès", desc: "Country sourdough, stone-baked", price: "4,50 €" },
      { name: "Ensaïmada", desc: "Butter-rich spiral, baked at dawn", price: "2,80 €" },
      { name: "Croissant de mantega", desc: "French butter, 27 layers", price: "1,90 €" },
      { name: "Coca de recapte", desc: "Roasted veg & anchovy, Sat–Sun", price: "6,00 €" },
    ],
    quotes: [
      { text: "The best bread in Gràcia, no discussion.", who: "Marta R." },
      { text: "I cross the city every Sunday for the ensaïmada.", who: "Jordi P." },
    ],
    address: "Carrer de Verdi, 42 · 08012 Barcelona",
    phone: "+34 932 00 00 01",
    hours: ["Mon–Sat 7:00–20:30", "Sun 8:00–14:00"],
  },
  {
    slug: "barberia-raval",
    theme: "theme-barber",
    name: "Barberia del Raval",
    kind: "Barbershop",
    barrio: "El Raval",
    tagline: "Sharp cuts. Hot towels. No rush.",
    intro: "Classic and modern cuts, straight-razor shaves and beard sculpting in a 1950s chair. Walk in or book your slot.",
    image: barber,
    cta: "Book a cut",
    services: [
      { name: "Classic cut", desc: "Scissors & clipper, wash included", price: "18 €" },
      { name: "Skin fade", desc: "Precision fade, styled finish", price: "20 €" },
      { name: "Hot towel shave", desc: "Straight razor, 30 min ritual", price: "16 €" },
      { name: "Cut + beard", desc: "The full treatment", price: "28 €" },
    ],
    quotes: [
      { text: "Best fade I've had in Barcelona.", who: "Alex M." },
      { text: "Real barbers, real conversation.", who: "Sergi V." },
    ],
    address: "Carrer de la Riera Baixa, 9 · 08001 Barcelona",
    phone: "+34 932 00 00 02",
    hours: ["Tue–Fri 10:00–20:00", "Sat 9:00–15:00"],
  },
  {
    slug: "bar-la-cova",
    theme: "theme-tapas",
    name: "Bar La Cova",
    kind: "Tapas bar",
    barrio: "Barceloneta",
    tagline: "Vermut, bravas & the sea breeze.",
    intro: "A neighbourhood bar two streets from the beach. House vermouth on tap, bravas with our secret sauce, and fish from the morning market.",
    image: tapas,
    cta: "Reserve a table",
    services: [
      { name: "Bravas de la casa", desc: "Our secret spicy sauce + allioli", price: "5 €" },
      { name: "Pa amb tomàquet", desc: "Toasted bread, tomato, olive oil", price: "3 €" },
      { name: "Bombas", desc: "Barceloneta's original, since forever", price: "4 €" },
      { name: "Vermut de grifo", desc: "House vermouth with olive & orange", price: "3 €" },
    ],
    quotes: [
      { text: "Feels like the real Barceloneta.", who: "Laura G." },
      { text: "The bombas alone are worth the trip.", who: "Tom H." },
    ],
    address: "Carrer de Sant Carles, 17 · 08003 Barcelona",
    phone: "+34 932 00 00 03",
    hours: ["Wed–Mon 12:00–00:00", "Tuesday closed"],
  },
  {
    slug: "flors-eixample",
    theme: "theme-flors",
    name: "Flors Eixample",
    kind: "Florist",
    barrio: "Eixample",
    tagline: "Seasonal flowers, wrapped with care.",
    intro: "Bouquets, plants and event flowers picked fresh from Mercabarna every morning. Same-day delivery across Barcelona.",
    image: flors,
    cta: "Order a bouquet",
    services: [
      { name: "Seasonal bouquet", desc: "Florist's choice, wrapped", price: "from 25 €" },
      { name: "Sant Jordi rose", desc: "Rose, wheat & senyera ribbon", price: "6 €" },
      { name: "Weddings & events", desc: "Custom design consultation", price: "on request" },
      { name: "Same-day delivery", desc: "Anywhere in Barcelona", price: "8 €" },
    ],
    quotes: [
      { text: "My go-to for every birthday.", who: "Núria C." },
      { text: "They made our wedding unforgettable.", who: "Pau & Ana" },
    ],
    address: "Carrer d'Enric Granados, 63 · 08008 Barcelona",
    phone: "+34 932 00 00 04",
    hours: ["Mon–Sat 9:30–20:30", "Sun 10:00–14:00"],
  },
  {
    slug: "bicis-poblenou",
    theme: "theme-bici",
    name: "Bicis Poblenou",
    kind: "Bike workshop",
    barrio: "Poblenou",
    tagline: "Fixed today. Riding tomorrow.",
    intro: "Repairs, tune-ups and refurbished city bikes. Honest prices, fast turnaround, and mechanics who actually ride.",
    image: bici,
    cta: "Book a repair",
    services: [
      { name: "Flat tyre fix", desc: "Tube + labour, while you wait", price: "12 €" },
      { name: "Full tune-up", desc: "Brakes, gears, chain, check", price: "45 €" },
      { name: "E-bike service", desc: "Motor & battery diagnostic", price: "60 €" },
      { name: "Refurbished bikes", desc: "Checked, guaranteed 6 months", price: "from 180 €" },
    ],
    quotes: [
      { text: "Fixed my bike in 20 minutes. Legends.", who: "Clara S." },
      { text: "Honest, fair, and fast.", who: "Marc D." },
    ],
    address: "Rambla del Poblenou, 120 · 08005 Barcelona",
    phone: "+34 932 00 00 05",
    hours: ["Mon–Fri 9:30–19:30", "Sat 10:00–14:00"],
  },
];

export const getSite = (slug: string) => sites.find((s) => s.slug === slug);
