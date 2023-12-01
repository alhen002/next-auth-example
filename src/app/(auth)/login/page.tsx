import {getServerSession} from "next-auth/next";

async function Page() {
    const session = await getServerSession()
    console.log(session)
    return (
        <div>Here will be a form and a login functionality</div>
    );
}

export default Page;