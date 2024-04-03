import bcrypt from "bcrypt"
import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server";
// import { redirect } from "next/navigation";

export async function POST(request: Request) {

    const { email, password } = await request.json()

    if (!email || !password) {
        return new NextResponse("Missing required fields", {status: 400})
    }

    const existingEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (existingEmail) throw Error('Email already exists')

    const passwordHashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email: email,
            password: passwordHashed
        }
    })

    return NextResponse.json(user)
}