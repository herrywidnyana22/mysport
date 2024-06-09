import { db } from "@/lib/db"

// DIFFERENT WAYS FOR LOGIN AUTH v5
export const getUserByUsernameLogin = async(username: string) =>{
    try {
        const user = await db.user.findUnique({
            where:{
                username
            }
        })

        return user
    } catch (error) {
        return null
    }
}