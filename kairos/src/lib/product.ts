'use server'

import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { createCart, getCart } from "./cart"
import { revalidatePath } from "next/cache"



export async function addProduct(formData: FormData) {
    const name = formData.get('name')?.toString()
    const description = formData.get('description')?.toString()
    const imageUrl = formData.get('imageUrl')?.toString()
    const price = Number(formData.get('price') || 0)

    if (!name || !description || !imageUrl || !price) {
        throw new Error('All fields are required')
    }

    await prisma.product.create({
        data: {
            name: name,
            description: description,
            imageUrl: imageUrl,
            price: price
        },
    })

    redirect('/')
}
// This function will be used to increment the quantity of a product in the cart
export async function incrementProductQuantity(productId: string) {
    const cart = await getCart() ?? await createCart() // If the user doesn't have a cart, create one

    const articleInCart = cart.items.find(item => item.productId === productId)

    if (articleInCart) {
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } }
        })
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: productId,
                quantity: 1
            }
        })
    }
    revalidatePath("/products/[id]")
}