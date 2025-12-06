import ProductDetail from "@/views/ProductDetail";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage() {
  return <ProductDetail />;
}
