// ref: https://authjs.dev/getting-started/typescript#module-augmentation


import {DefaultSession, DefaultUser} from "next-auth";
import {JWT, DefaultJWT} from "next-auth/jwt";
import {Role} from ".prisma/client";
declare module "next-auth" {
    interface Session{
        user: {
            id: string,
            name: string,
            role: Role,
            email: string,
        }& DefaultSession["user"]
    }
    interface User extends DefaultUser{
        id: string,
        role: Role,
        name: string,
        email: string,
    }

}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: Role,
        id: string
    }
}
