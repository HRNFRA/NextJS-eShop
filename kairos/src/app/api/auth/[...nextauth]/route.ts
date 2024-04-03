import { mergeAnonCartIntoUserCart } from "@/lib/cart"
import { prisma } from "@/lib/db/prisma"
import { env } from "@/lib/env"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                
                if (!credentials) {
                    throw new Error("No credentials provided")
                }

                if (!credentials.email || !credentials.password) {
                    throw new Error("Email and password are required")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user || !user?.password) {
                    throw new Error("No user found")
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password)

                if (!passwordMatch) {
                    throw new Error("Incorrect credentials")
                }
                
                return user
            }
        })
    ],
    callbacks: {
        session({session, user}) {
            session.user.id = user.id
            return session
        },
    },
    events: {
        async signIn({user}) {
            await mergeAnonCartIntoUserCart(user.id)
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }