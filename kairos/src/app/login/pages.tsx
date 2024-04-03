'use client'

import { FormEvent, useState } from "react"
import FormSubmitButton from "@/components/FormSubmitButton"
import { redirect } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage() {

    // const [inputClass, setInputClass] = useState('input input-bordered input-secondary mb-3')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        })
        
        console.log({response})
        
        redirect("/")
    }

    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-items-center">
                <h1 className="mb-3">Login Page</h1>
                    <form
                    className="flex flex-col items-center justify-items-center"
                    >
                        <input
                            required
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered input-secondary mb-3"
                        />
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered input-secondary mb-3"
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