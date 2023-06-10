import NextAuth from "next-auth/next";
import prisma from '../../../libs/prismaDb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                name: { label: "name", type: "text", placeholder: "John Smith" },
            },
            async authorize(credentials) {
              
                // check to see if email and password is there
               const user={id:1,email:"mohamed@yahoo.com",name:"mohamed jamalian",password:"123456"}
               return user
                }




             })
              ],
              secret: process.env.SECRET,
              session: {
                  strategy: "jwt",
              },
              debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}