'use server'

import { signOut } from "@/auth"
import { respon } from "@/types/api-respon"

export const onLogout = async() =>{
    await signOut({
        redirect: true,
        redirectTo:"/auth/login"
    })
}