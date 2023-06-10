import NextAuth from "next-auth/next";
import prisma from '../../../libs/prismaDb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
 import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        
        GoogleProvider({
            clientId:"143200115767-i89te2dp354f1s2gkpi9m8j4n0h5qo7p.apps.googleusercontent.com",
            clientSecret:"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",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                name: { label: "name", type: "text", placeholder: "name" },
            },
            async authorize(credentials) {
              
                // check to see if email and password is there
                if(!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }

                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
            },
        }),  
    ],
    secret:"123456",
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}