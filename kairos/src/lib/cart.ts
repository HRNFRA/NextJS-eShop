import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import { Cart, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

// This type will be used to define the cart with its products
export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } }
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true }
}>

// This type will be used to define the cart with its products, size and subtotal
export type ShoppingCart = CartWithProducts & {
    size: number
    subtotal: number
}

// This function will be used to get the cart of the user
export async function getCart(): Promise<ShoppingCart | null> {
    const localCartId = cookies().get("localCartId")?.value

    // If the user has a cart, return it
    const cart = localCartId ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } }
    }) : null

    if (!cart) {
        return null
    }
    
    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    }
}
// If the user doesn't have a cart, create one and return it
export async function createCart(): Promise<ShoppingCart> {
    
    const session = await getServerSession(authOptions)
    
    let newCart: Cart

    if (session) {
        newCart = await prisma.cart.create({
            data: {
                userId: session.user.id
            }
        })
    } else {
        newCart = await prisma.cart.create({
            data: {}
        })
    
        cookies().set("localCartId", newCart.id) // Needs encryption to be secured + secured settings for production
    }

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0
    }
}