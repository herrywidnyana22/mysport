import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const AdminPage = async() =>{

    const userSession = await auth()
    const onLogout = async() =>{
        'use server'
        await signOut({
            redirectTo: "/auth/login"
        })
    }
    return(
        <div>
            {JSON.stringify({userSession})}
            <form action={onLogout}>
                <Button type="submit">
                    Sign out
                </Button>

            </form>
        </div>
    )
}

export default AdminPage