import type { Metadata } from 'next'
import {ReactNode} from "react";
import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import LoginButton from "@/app/components/LoginButton";
import LogoutButton from "@/app/components/LogoutButton";
import {redirect} from "next/navigation";
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


        </>

    );
}
export default Page;