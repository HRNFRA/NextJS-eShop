'use server'

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import SignupForm from "./SignupForm"

export default async function SignUpPage() {
    
    const session = await getServerSession()
    
    if (session) {
        redirect("/dashboard")
    }

    return (
        <SignupForm />
    )
}