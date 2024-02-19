import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default async function Home() {
  
  const products = await prisma.product.findMany({
      orderBy: {
          id: 'desc'
      }
  })
  
  return (
    <div>
      <ProductCard product={products[0]} />
    </div>
  );
}
