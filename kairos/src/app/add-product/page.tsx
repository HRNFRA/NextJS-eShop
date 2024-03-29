import FormSubmitButton from "@/components/FormSubmitButton"
import { addProduct } from "@/lib/product"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"


export default async function AddProductPage() {
    
    const session = await getServerSession(authOptions)

    if(!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }

    return (
        <div>
            <h1 className="text-lg font-bold mb-3">Add Product</h1>
            <form action={addProduct}>
                <input 
                    type="text"
                    required
                    name="name"
                    placeholder="Name"
                    className="input input-bordered mb-3 w-full"
                />

                <textarea
                    required
                    name="description"
                    placeholder="Description"
                    className="textarea textarea-bordered mb-3 w-full"
                />

                <input 
                    type="url"
                    required
                    name="imageUrl"
                    placeholder="Image URL"
                    className="input input-bordered mb-3 w-full"
                />

                <input 
                    type="number"
                    required
                    name="price"
                    placeholder="Price"
                    className="input input-bordered mb-3 w-full"
                />

                <FormSubmitButton
                    className="btn-primary btn-block"
                >
                    Add Product
                </FormSubmitButton>
                
            </form>
        </div>
    )
}