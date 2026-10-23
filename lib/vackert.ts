import {
  Sprout,
  Pickaxe,
  Factory,
  Zap,
  HardHat,
  Store,
  Truck,
  Landmark,
  HeartHandshake,
  Ship,
} from "lucide-react";

export const sectors = [
  {
    title: "Agriculture, Hunting, Forestry & Fishing",
    short: "Agriculture",
    description: "Land- and nature-based activities such as crop cultivation, livestock farming, wildlife hunting, forestry management and catching fish.",
    icon: Sprout,
  },
  {
    title: "Mining & Quarrying",
    short: "Mining",
    description: "Extracting precious minerals (like gold or gemstones) and construction materials (like stones and sand) from above or beneath the ground.",
    icon: Pickaxe,
  },
  {
    title: "Manufacturing",
    short: "Manufacturing",
    description: "Processing raw materials into finished or semi-finished goods within a factory or workshop setting.",
    icon: Factory,
  },
  {
    title: "Electricity, Gas & Water Supply",
    short: "Energy & Water",
    description: "Utility services provided to the public, such as electricity distribution, gas supply and clean water systems.",
    icon: Zap,
  },
  {
    title: "Construction",
    short: "Construction",
    description: "Building and renovating houses, roads, bridges and various other infrastructural projects.",
    icon: HardHat,
  },
  {
    title: "Trade, Repair, Hotels & Restaurants, Export & Import",
    short: "Trade",
    description: "Buying and selling goods in bulk or small quantities, repairing equipment, running hotels and restaurants, and international trade.",
    icon: Store,
  },
  {
    title: "Transport, Storage & Communication",
    short: "Transport",
    description: "Transporting people and goods, warehousing, and telecommunications or postal services.",
    icon: Truck,
  },
  {
    title: "Finance, Insurance, Real Estate & Business Services",
    short: "Finance",
    description: "Banking services, insurance coverage, buying and selling properties, and other professional business consultancies.",
    icon: Landmark,
  },
  {
    title: "Community, Social & Personal Services",
    short: "Community Services",
    description: "Community-level services, education, healthcare, cultural activities and personal services rendered to individuals.",
    icon: HeartHandshake,
  },
  {
    title: "Free Trade Zone",
    short: "Free Trade Zones",
    description: "Designated areas where goods can be landed, handled, manufactured or re-exported with minimal customs regulations and lower or no duties.",
    icon: Ship,
  },
];

// Contact details shown on the Vackert page — update here when Vackert has its own
export const site = {
  name: "Vackert",
  sister: "Optima Technologies",
  email: "optimatech.dev@gmail.com",
  phones: [
    { label: "+251 939 405104", href: "tel:+251939405104" },
    { label: "+251 914 585645", href: "tel:+251914585645" },
  ],
  location: "Addis Ababa & Regional Cities, Ethiopia",
};
