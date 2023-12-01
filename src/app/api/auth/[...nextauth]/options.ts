import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GithubProfile } from "next-auth/providers/github";
import {prisma} from "../../../../../lib/prisma";
import {compare} from "bcrypt";
export const options : NextAuthOptions = {
    providers: [
        GitHubProvider({
            // TODO: FEHLER FINDEN IM TYPE
            profile(profile: GithubProfile) {
                console.log(profile)
                return {
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                    randomKey: "hey cool"
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

                if (!credentials?.email || !credentials?.password) {return null}

                // Add logic here to look up the user from the credentials supplied
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user) {return null}
                const isValid = await compare(credentials.password, user.password)
                if (!isValid) {return null}
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    randomKey: "hey cool"
                };
            }
        })
    ],
     callbacks: {
         async jwt({token, user}) {
             console.log("JWT Callback", "token:",token, "user:",user)
             if (user) {
                 return {
                     ...token,
                     id: user.id,
                     randomKey: user.randomKey
                 }
             }
             return token
         },
        async session({session, token}) {
            console.log("SESSION Callback", "session:",session, "token", token)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            }

        }


    }
}