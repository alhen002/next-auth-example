// ref: https://authjs.dev/getting-started/typescript#module-augmentation

 import {DefaultSession, DefaultUser} from "next-auth";
import {JWT, DefaultJWT} from "next-auth/jwt";


declare module "next-auth" {
    interface Session{
        user: {
            id: string,
            role: string,
            name: string,
            email: string,
        }& DefaultSession["user"]
    }
    interface User extends DefaultUser {
        id: string,
        role: string,
        name: string,
        email: string,
        randomKey: string
    }
}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
        id: string
    }
}

