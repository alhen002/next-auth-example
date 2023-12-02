// ref: https://next-auth.js.org/configuration/nextjs#advanced-usage

import {withAuth} from "next-auth/middleware";
import type {NextRequestWithAuth} from "next-auth/middleware"
import {NextResponse} from "next/server";
import {prisma} from "../lib/prisma";

export default withAuth(
    // withAuth augmennts your request object with a nextauth property
    function middleware(request: NextRequestWithAuth) {

        console.log(request?.nextauth?.token?.id);

       if (request.nextUrl.pathname.startsWith("/extra")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                // redirect to denied page
                new URL("denied", request.url)
            )
        }
        if (request.nextUrl.pathname.startsWith("/dashboard")
            && request.nextauth.token?.role !== "admin"
            && request.nextauth.token?.role !== "manager"){
            return NextResponse.rewrite(
                // redirect to denied page
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