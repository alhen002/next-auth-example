import { PrismaClient } from '@prisma/client'
import {hash} from "bcrypt";
const prisma = new PrismaClient()
async function main() {
    const password = await hash("test", 12)
    const user = await prisma.user.upsert({
        where: {
            email: 'a.henting@posteo.at'
        },
        update: {},
        create: {
            email: 'a.henting@posteo.at',
            name: 'Alex',
            password,
        },
    })
    console.log({user})
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
