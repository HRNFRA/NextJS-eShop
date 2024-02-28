'use client'

import Image from "next/image"
import { CartItemWithProduct } from "@/lib/cart"
import Link from "next/link"
import { formatPrice } from "@/lib/format"
import { useTransition } from "react"
import { MdDelete } from "react-icons/md"

interface CartEntryProps {
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export default function CartEntry({ cartItem : {product, quantity}, setProductQuantity }: CartEntryProps) {
    
    const [isPending, startTransition] = useTransition()

    const quantityOptions: JSX.Element[] = []
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option key={i} value={i}>
                {i}
            </option>)
    }

    return (
        <div>
            <div className="flex flew-wrap items-center gap-3">
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="rounded-lg"
                    />
                </Link>
                <div>
                    <Link href={`/product/${product.id}`} className="font-bold text-lg">
                        {product.name}
                    </Link>
                    <div>Price: {formatPrice(product.price)}</div>
                    <div className="my-1 flex items-center gap-2">
                        Quantity:
                        <select
                        className="select select-bordered w-full max-w-[80px]"
                        defaultValue={quantity}
                        onChange={(e) => {
                            const newQuantity = parseInt(e.target.value)
                            startTransition(async () => {
                                await setProductQuantity(product.id, newQuantity)
                            })
                        }}
                        >
                            {quantityOptions}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        Total: {formatPrice(product.price * quantity)}
                        {isPending && <span className="loading loading-spinner loading-sm" />}
                    </div>
                    <div>
                        <button 
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                            startTransition(async () => {
                                await setProductQuantity(product.id, 0)
                            })
                        }}
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>
            </div>
            <div className="divider"/>
        </div>
    )
}