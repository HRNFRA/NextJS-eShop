'use client'

import FormSubmitButton from "@/components/FormSubmitButton"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"

export default function LoginForm() {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        })
        if (!response?.error) {
            router.push("/")
            router.refresh()
        }
    }

    return (
        // <div className="h-full w-full flex justify-center items-center border border-red-600">
            <div className="flex flex-col items-center justify-items-center">
                <h1 className="mb-3">Login Page</h1>
                    <form
                    onSubmit={login}
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
        // </div>
    )
}