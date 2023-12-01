import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GithubProfile } from "next-auth/providers/github";
export const options : NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                console.log(profile)
                return {
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                }
            },
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password", placeholder: "1234"}
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "42", name: "alhen002", email: "a.henting@posteo.de", password: "admin", role: "user", image: "https://images.unsplash.com/photo-1699614614613-bb757029f49f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
                if (user.name === credentials?.username && user.password === credentials?.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
        if(user) {
            token.id = user.id
            token.role = user.role
            token.image = user.image;
        }
            return token
        },
        async session({session, token}) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.image = token.image;
            }
            return session
        }

    }
}