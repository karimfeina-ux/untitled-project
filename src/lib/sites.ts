// Real Barcelona businesses with no website listed on Google Maps.
// Phone, address, hours, rating, reviews and photos come from their Google Maps listing (Oct 2026).
import forn from "@/assets/real-forn.jpg.asset.json";
import barber from "@/assets/real-barber.jpg.asset.json";
import tapas from "@/assets/real-tapas2.jpg.asset.json";
import flors from "@/assets/real-flors2.jpg.asset.json";
import bici from "@/assets/real-bici.jpg.asset.json";

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
  services: { name: string; desc: string }[];
  quotes: { text: string; who: string }[];
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  mapsUrl: string;
  hours: string[];
};

export const sites: Site[] = [
  {
    slug: "forn-jaume-montserrat",
    theme: "theme-forn",
    name: "Forn Jaume Montserrat",
    kind: "Bakery",
    barrio: "Gràcia",
    tagline: "A family bakery, baking for generations.",
    intro: "Scratch-made bread, croissants, apple pies and coca de llardons on Rambla de Prat. Recipes handed down in the same family.",
    image: forn.url,
    cta: "Call to order",
    services: [
      { name: "Pa artesà", desc: "Scratch-made breads, baked daily" },
      { name: "Croissants", desc: "Including the mini chocolate-dipped ones" },
      { name: "Apple pie", desc: "The one our regulars dream about" },
      { name: "Tortell de Reis", desc: "Kings' Day classic — the queue goes round the block" },
    ],
    quotes: [
      { text: "Scratch-made bread meets authenticity, history, and family.", who: "Rosemary Gutierrez" },
      { text: "Impressed by the quality of breads and pastries — we came back a few times.", who: "Y H" },
    ],
    rating: 4.8,
    reviewCount: 200,
    address: "Rambla de Prat, 21, Gràcia, 08012 Barcelona",
    phone: "+34 932 18 05 46",
    mapsUrl: "https://maps.google.com/?cid=4712620581805170093",
    hours: ["Mon–Sat 7:15–21:00", "Sunday closed"],
  },
  {
    slug: "the-barber-club",
    theme: "theme-barber",
    name: "The Barber Club",
    kind: "Barbershop",
    barrio: "El Raval",
    tagline: "Sharp fades. Clean beards. Open 7 days.",
    intro: "Skin fades, beard trims and classic cuts on Carrer de Sant Pau — with a head massage to finish. Walk in any day of the week.",
    image: barber.url,
    cta: "Book on WhatsApp",
    services: [
      { name: "Haircut", desc: "Classic or modern, styled to your photo" },
      { name: "Skin fade", desc: "Low, mid or high — precision work" },
      { name: "Beard trim", desc: "Shaped and lined up" },
      { name: "Cut + beard", desc: "The full treatment, head massage included" },
    ],
    quotes: [
      { text: "Great attention to detail and very friendly. I even got a head massage at the end!", who: "Toby Tyrrell" },
      { text: "Cut my mid fade perfectly. Great services and prices.", who: "Eric Napper" },
    ],
    rating: 4.9,
    reviewCount: 669,
    address: "Carrer de Sant Pau, 13, bajo 3, Ciutat Vella, 08001 Barcelona",
    phone: "+34 695 79 33 37",
    mapsUrl: "https://maps.google.com/?cid=6321368303583567909",
    hours: ["Mon, Thu–Sun 9:00–21:30", "Tue 9:30–21:30", "Wed 9:00–21:00"],
  },
  {
    slug: "petit-bar",
    theme: "theme-tapas",
    name: "Petit Bar",
    kind: "Tapas bar",
    barrio: "Barceloneta",
    tagline: "The Barceloneta bar locals keep for themselves.",
    intro: "Homemade vermouth, fresh tap beer and tapas a few steps from the beach. No tourist trap — just a proper Catalan bar.",
    image: tapas.url,
    cta: "Call the bar",
    services: [
      { name: "Vermut de la casa", desc: "Homemade — people ask to buy bottles" },
      { name: "Anchovies & olives", desc: "Simple, fresh, perfect with vermouth" },
      { name: "Tapas", desc: "Ask the bartender what's good today" },
      { name: "Cerveza de grifo", desc: "Fresh tap beer" },
    ],
    quotes: [
      { text: "Proves there are still places in Barceloneta that are not tourist traps.", who: "CrazyMakdous" },
      { text: "The homemade vermouth — I wish I could've bought bottles to bring home!", who: "L Wolftowns" },
    ],
    rating: 4.6,
    reviewCount: 948,
    address: "Carrer del Judici, 7, Ciutat Vella, 08003 Barcelona",
    phone: "+34 653 97 81 87",
    mapsUrl: "https://maps.google.com/?cid=13173663408151711190",
    hours: ["Tue–Fri 8:00–16:00, 19:00–22:00", "Sat 10:00–22:00", "Sun 10:00–16:00", "Monday closed"],
  },
  {
    slug: "floristeria-raco-verd",
    theme: "theme-flors",
    name: "Floristeria Racó Verd",
    kind: "Florist",
    barrio: "Eixample",
    tagline: "Your bouquet, made on the spot.",
    intro: "Pick a flower you love and we'll build a bouquet around it in minutes. A friendly neighbourhood florist on Carrer de la Diputació — we speak English too.",
    image: flors.url,
    cta: "Call to order",
    services: [
      { name: "Bouquets on the spot", desc: "Made in front of you, in minutes" },
      { name: "Custom bouquets", desc: "Choose the flower, we add the artistry" },
      { name: "Plants", desc: "For home, office or a gift" },
      { name: "Gifts & occasions", desc: "Birthdays, thank-yous, Sant Jordi" },
    ],
    quotes: [
      { text: "In 4 minutes I had a stunning bouquet. The florist truly made a work of art.", who: "Z N" },
      { text: "Very accommodating and friendly. He also speaks English.", who: "Saira Guiao" },
    ],
    rating: 4.8,
    reviewCount: 163,
    address: "Carrer de la Diputació, 222, Eixample, 08011 Barcelona",
    phone: "+34 652 84 36 17",
    mapsUrl: "https://maps.google.com/?cid=14581174614078858846",
    hours: ["Mon–Thu 11:30–21:30", "Fri–Sat 11:30–22:00", "Sun 11:30–15:00"],
  },
  {
    slug: "taller-bikes",
    theme: "theme-bici",
    name: "Taller Bikes",
    kind: "Bike workshop",
    barrio: "Poblenou",
    tagline: "Fixed today. Riding tomorrow.",
    intro: "A homey bike workshop on Carrer del Taulat — look for the yellow tricycle on the wall. Repairs done right by someone who knows bikes.",
    image: bici.url,
    cta: "Call the workshop",
    services: [
      { name: "Repairs", desc: "Shifters, brakes, wheels — whatever broke" },
      { name: "Flat tyres", desc: "Quick fixes" },
      { name: "Tune-ups", desc: "Get it riding like new" },
      { name: "Advice", desc: "Honest, from someone who rides" },
    ],
    quotes: [
      { text: "Fixed my bike after the shifter exploded and it has worked as new ever since.", who: "Emil Örn Kristjánsson" },
      { text: "Trusting and trustworthy and knows what he's doing. We will be back!", who: "Anna Magnusdottir" },
    ],
    rating: 5,
    reviewCount: 14,
    address: "Carrer del Taulat, 10, Sant Martí, 08005 Barcelona",
    phone: "+34 632 18 57 92",
    mapsUrl: "https://maps.google.com/?cid=17211258607476200255",
    hours: ["Mon–Sat 10:00–14:00, 16:00–20:00", "Sunday closed"],
  },
];

export const getSite = (slug: string) => sites.find((s) => s.slug === slug);
