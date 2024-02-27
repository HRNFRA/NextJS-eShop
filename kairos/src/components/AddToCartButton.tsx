'use client'

import { useState, useTransition } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

interface AddToCartButtonProps {
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<void>, // This function will be used to increment the quantity of a product in the cart
}

export default function AddToCartButton({ productId, incrementProductQuantity }: AddToCartButtonProps) {
    
    let [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    
    return (
        <div className="flex item-center gap-2">
            <button 
            className="btn btn-primary"
            onClick={() => {
                setSuccess(false)
                startTransition(async () => { await incrementProductQuantity(productId) })
                setSuccess(true)
            }}
            >
                Add to Cart
                <MdOutlineShoppingCart />
            </button>
            { isPending && <span className="loading loading-spinner loading-md"/> }
            { !isPending && success && <span className="text-success">Added to cart</span>}
        </div>
    )
}