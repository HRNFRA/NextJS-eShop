'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

interface CheckoutProps {
    cart: number | 0
}

export default function Checkout({ cart } : CheckoutProps) {

    const [ empty, setEmpty ] = useState(true)

    useEffect(() => { 
        if(cart > 0) {
            setEmpty(false)
        }
    }, [cart])

    

    return empty ? (
        <span className="btn btn-primary sm:w-[200px]" style={{ pointerEvents: 'none', opacity: 0.5 }}>Checkout</span>
    ) : (
        <Link href={"/checkout"} className="btn btn-primary sm:w-[200px]">Checkout</Link>
    )
}