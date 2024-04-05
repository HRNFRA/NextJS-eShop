import CartEntry from "@/components/CartEntry"
import { getCart } from "@/lib/cart"
import { formatPrice } from "@/lib/format"
import { setProductQuantity } from "@/lib/product"
import Checkout from "./Checkout"


export const metadata = {
    title: "FrogWatch | Shopping Cart",
}

export default async function CartPage() {
    
    const cart = await getCart()
    
    return (
        <div className="flex flex-col items-center justify-center sm:min-h-[680px]">
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            ))}
            {!cart?.items.length && <p>Your cart is empty...</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 text-2xl font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <Checkout cart={cart?.items.length || 0} />
            </div>
        </div>
    )
}