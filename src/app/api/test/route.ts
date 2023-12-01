import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options"
import {NextResponse} from "next/server";
import {prisma} from "../../../../lib/prisma";
export async function GET(request: Request) {
    const session = await getServerSession(options);


    const user = await prisma.user.findUnique({
        where: {
            id: session?.user.id
        },
        include: {
            role: true
        }
    })
    if (!session || !user || user?.role?.name != "admin") {
        return new NextResponse(JSON.stringify({error: "Unauthorized"}), {status: 401})
    }

    return NextResponse.json({user});
}