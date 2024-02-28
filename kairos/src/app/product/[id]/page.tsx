import AddToCartButton from "@/components/AddToCartButton";
import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { incrementProductQuantity } from "@/lib/product";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";


interface ProductsPageProps {
    params: {id: string}
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({where: { id }})
    if (!product) notFound()
    return product
})

export async function generateMetadata({ params: {id}}: ProductsPageProps): Promise<Metadata> {
    const product = await getProduct(id)
    return {
        title: "Kairos | " + product.name,
        description: product.description,
        openGraph: {
            images: [{ url : product.imageUrl}]
        }
    }
}

export default async function ProductPage({ params: {id}}: ProductsPageProps) {
    
    const product = await getProduct(id)

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <Image 
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-5xl">
                    {product.name}
                </h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-6">{product.description}</p>
                <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
            </div>
        </div>
    )
}
