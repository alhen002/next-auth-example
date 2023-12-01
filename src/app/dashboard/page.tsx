import type { Metadata } from 'next'
import {ReactNode} from "react";
import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import LoginButton from "@/app/components/LoginButton";
import LogoutButton from "@/app/components/LogoutButton";
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
    console.log("SESSION:",session);


    return (
        <>
            <LoginButton />
            <LogoutButton />
            {/*<p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <p>{session.user.id}</p>
            <Image src={session.user.image} alt={"user image"} width={100} height={100}/>
            <p>{session.user.role}</p>*/}
        </>

    );
}
export default Page;