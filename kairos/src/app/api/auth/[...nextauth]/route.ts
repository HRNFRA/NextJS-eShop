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
        // GoogleProvider({
        //     clientId: env.GOOGLE_CLIENT_ID,
        //     clientSecret: env.GOOGLE_CLIENT_SECRET,
        // }), => Mofify the URI for production environment
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
                console.log("test")
                console.log(user)
                return user
            }
        })
    ],
    secret: env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt", // Use JWTs for session tokens
    },
    callbacks: {
        session({session, token, user}) {
            console.log("test1")
            if (token) {
                session.user = session.user || {}
                if (token.sub) {
                    session.user.id = token.sub || session.user.id
                }
                session.user.name = token.email || session.user.name
            } else {
                session.user.id = user.id
            }

            console.log(token, session, user)
            return session
        },
        // session: async ({session, user}) => {
        //     session.user.id = user.id
        //     return Promise.resolve(session)
        // },
        // jwt: async ({token, user}) => {
        //     if (user) {
        //         token.id = user.id
        //     }
        //     return Promise.resolve(token)
        // },
    },
    pages: {
        signIn: "/",
    },
    events: {
        async signIn({user}) {
            if (user) {
                await mergeAnonCartIntoUserCart(user.id)
            }
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }