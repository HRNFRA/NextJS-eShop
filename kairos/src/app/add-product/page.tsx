'use client'

import addProduct from "@/lib/action"


export default function AddProductPage() {
    
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

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Add Product
                </button>
            </form>
        </div>
    )
}