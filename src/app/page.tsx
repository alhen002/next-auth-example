import {prisma} from "../../lib/prisma";


export default async function Home() {

  const user = await prisma.user.findFirst({
    where: {
      email: "a.henting@posteo.at"
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hello, {user ? user?.name : "Guest"}</p>
    </main>
  )
}
