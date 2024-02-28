'use client'

import { ShoppingCart } from "@/lib/cart"
import { formatPrice } from "@/lib/format"
import Link from "next/link"
import { MdOutlineShoppingCart } from "react-icons/md"

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null,
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
    
    function closeDropdown() {
        const element = document.activeElement as HTMLElement
        if (element) element.blur()
    }
    
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <MdOutlineShoppingCart />
                    <span className="badge badge-sm indicator-item">{cart?.size || 0}</span>
                </div>
            </label>
            <div tabIndex={0} className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30">
                <div className="card-body">
                    <span className="text-lg font-bold">{cart?.size || 0} Items</span>
                    <span className="text-info">Subtotal: {formatPrice(cart?.subtotal || 0)}</span>
                    <div className="card-actions">
                        <Link 
                            href="/cart" 
                            className="btn btn-primary btn-block"
                            onClick={closeDropdown}
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}