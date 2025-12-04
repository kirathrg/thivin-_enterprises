export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  itemsIncluded: string[];
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Household Facilitation Pack",
    price: 9999,
    description: "The ultimate home setup kit. Perfect for new families.",
    itemsIncluded: [
      "3-Burner Glass Top Gas Stove",
      "Heavy Duty Mixer Grinder",
      "32-piece Stainless Steel Dinner Set",
      "Stainless Steel Storage Containers",
    ],
    imageUrl: "https://via.placeholder.com/400x300?text=Royal+Pack", // Placeholder image for kitchen appliances
  },
  {
    id: "2",
    name: "Essential Living Bundle",
    price: 5000,
    description: "Daily essentials to beat the heat and keep the kitchen running.",
    itemsIncluded: [
      "High-speed Table Fan (Red/Black)",
      "5kg Premium Ponni Rice",
      "Electric Kettle (1.8L)",
      "Rechargeable LED Emergency Light",
      "Insulated Casserole",
    ],
    imageUrl: "https://via.placeholder.com/400x300?text=Essential+Bundle", // Placeholder image for home essentials
  },
  {
    id: "3",
    name: "Kitchen Starter Combo",
    price: 3499,
    description: "High-quality basics for every kitchen.",
    itemsIncluded: [
      "3L Aluminium Pressure Cooker",
      "Large Stainless Steel Storage Drum",
      "Electric Kettle",
      "LED Emergency Light",
      "Water Dispenser Set",
    ],
    imageUrl: "https://via.placeholder.com/400x300?text=Kitchen+Starter", // Placeholder image for kitchen basics
  },
];