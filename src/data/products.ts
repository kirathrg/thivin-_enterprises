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
    name: "Household Facilitation Pack",
    price: 5000,
    description: "The ultimate home setup kit. Perfect for new families.",
    itemsIncluded: [
      "High-Speed Table Fan",
      "Stainless Steel Electric Kettle",
      "Water Dispenser 5L",
      "Insulated Casserole",
      "Akari LED Emergency Light",
      "5L Stainless Steel Drum",
    ],
    imageUrl: "/src/assets/WhatsApp Image 2025-12-03 at 9.40.23 PM.jpeg",
  },
  {
    id: "2",
    name: "Essential Living Bundle",
    price: 5000,
    description: "Daily essentials to beat the heat and keep the kitchen running.",
    itemsIncluded: [
      "Aluminium Pressure Cooker (3L)",
      "Electric Kettle (1.8L)",
      "Teal Water Dispenser (5L)",
      "Akari rechargeable LED light",
      "Stainless Steel Drum (10L)",
    ],
    imageUrl: "/src/assets/WhatsApp Image 2025-12-03 at 9.40.22 PM.jpeg",
  },
  {
    id: "3",
    name: "Kitchen Starter Combo",
    price: 9999,
    description: "High-quality basics for every kitchen.",
    itemsIncluded: [
      "Stainless Steel Utensil Set",
      "Surya Gas Stove 3-Burner",
      "Mixer Grinder",
      "Cutlery set",
    ],
    imageUrl: "/src/assets/WhatsApp Image 2025-12-03 at 9.40.21 PM.jpeg",
  },
];