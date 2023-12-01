import { PrismaClient } from '@prisma/client'
import {hash} from "bcrypt";
const prisma = new PrismaClient()
async function main() {
    const adminPassword: string = await hash("test", 12)
    const userPassword = await hash("user", 12)
    const admin = await prisma.user.upsert({
        where: {email: 'a.henting@posteo.at'},
        update: {},
        create: {
            email: 'a.henting@posteo.at',
            name: 'Alex as Admin',
            password: adminPassword,
            role: {
                create: {
                    name: "admin",
                    description: "admin role"
                }
            }
        },
    })
    const user = await prisma.user.upsert({
        where: {email: 'a.henting@posteo.at'},
        update: {},
        create: {
            email: 'user.henting@posteo.at',
            name: 'Alex as User',
            password: userPassword,
            role: {
                create: {
                    name: "user",
                    description: "user role"
                }
            }
        },
    })
    console.log({admin})

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
