// ref: https://next-auth.js.org/configuration/nextjs#advanced-usage

import {withAuth} from "next-auth/middleware";
import type {NextRequestWithAuth} from "next-auth/middleware"
import {NextResponse} from "next/server";


export default withAuth(
    // withAuth augmennts your request object with a nextauth property
    function middleware(request: NextRequestWithAuth) {
        console.log(request.nextUrl.pathname)
        console.log(request.nextauth.token);
        // complex logic for many users and roles
        if (request.nextUrl.pathname.startsWith("/extra")
            && request.nextauth.token?.role.name !== "admin") {
            return NextResponse.rewrite(
                new URL("denied", request.url)
            )
        }
        if (request.nextUrl.pathname.startsWith("/dashboard")
            && request.nextauth.token?.role.name !== "admin"
            && request.nextauth.token?.role.name !== "manager"){
            return NextResponse.rewrite(
                new URL("denied", request.url)
            )
        }

    },
    {
        callbacks: {
            authorized: ({token}) => !!token
        },
    }
)

export const config = {
    matcher: [ "/extra", "/dashboard"]
}