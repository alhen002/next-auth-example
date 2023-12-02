import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GithubProfile } from "next-auth/providers/github";
import {prisma} from "../../../../../lib/prisma";
import {compare} from "bcrypt";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const options : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
         GitHubProvider({
             async profile(profile: GithubProfile) {
                    return {
                        id: profile.id.toString(),
                        name: profile.name,
                        email: profile.email,
                        image: profile.avatar_url,
                        roleId: "ba2198db-fc84-45ca-965a-388ee4ba71b9"
                    }
             },
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hello@example.com" },
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                // Important
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    },
                    include: {
                        role: true
                    }
                })

                if (!user) {return null}
                const isValid = await compare(credentials.password, user.password)
                if (!isValid) {return null}
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role.name
                };
            }
        })
    ],
    callbacks: {
         async jwt({token, user}) {
             if (user) {
                 return {
                     ...token,
                     id: user.id ? user.id : token.id,
                    role: user.role ? user.role : token.role
                 }
             }
             return token
         },
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id ? token.id : session.user.id,
                    role: token.role ? token.role : session.user.role
                }
            }

        }
    }
}