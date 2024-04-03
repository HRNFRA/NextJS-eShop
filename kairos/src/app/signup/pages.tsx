'use client'

import { FormEvent, useState } from "react"
import FormSubmitButton from "@/components/FormSubmitButton"
import { redirect } from "next/navigation"

export default function SignUpPage() {
    
    const [inputClass, setInputClass] = useState('input input-bordered input-secondary mb-3')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            })
        })
        console.log({response})
        
        redirect("/")
    }

    
    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-items-center">
                <h1 className="mb-3">Sign Up</h1>
                <form
                    onSubmit={signup}
                    className="flex flex-col items-center justify-items-center"
                >

                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={inputClass}
                        onFocus={() => setInputClass("input input-bordered input-primary mb-3")}
                        // onBlur={() => setInputClass("input input-bordered input-secondary mb-3")}
                    />

                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={inputClass}
                        onFocus={() => setInputClass("input input-bordered input-primary mb-3")}
                        // onBlur={() => setInputClass("input input-bordered input-secondary mb-3")}
                    />

                    <FormSubmitButton
                        disabled={isLoading}
                        className="btn btn-primary btn-block mb-3"
                    // eslint-disable-next-line react/no-unescaped-entities
                    >Let's Go !</FormSubmitButton>

                </form>
            </div>
        </main>
    )
}