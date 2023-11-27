import type { Metadata } from 'next'
import {ReactNode} from "react";
import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard',
}

interface PageProps {
    children: ReactNode
}
async function Page({ children }: PageProps) {
    const session = await getServerSession(options)
    console.log(session)

    // redirects if no session
    if(!session) {
        redirect("/api/auth/signin?callbackUrl=/dashboard")
    }
    return (
        <>
            {session && <p>Dashboard</p>}
        </>

    );
}

export default Page;