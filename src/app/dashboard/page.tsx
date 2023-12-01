import type { Metadata } from 'next'
import {ReactNode} from "react";
import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Image from "next/image";
import type {User} from "next-auth"
import type {Session} from "next-auth"
export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard',
}

interface PageProps {
    children: ReactNode
}
async function Page({ children }: PageProps) {
    const session = await getServerSession(options);
    // redirects if no session
    console.log(session);
    if(!session) {
        redirect("/api/auth/signin?callbackUrl=/dashboard")
    }

    return (
        <>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <p>{session.user.id}</p>
            <Image src={session.user.image} alt={"user image"} width={100} height={100}/>
            <p>{session.user.role}</p>
        </>

    );
}
export default Page;