'use server'

import { LoginSchema } from "@/lib/formSchema"
import { z } from "zod"
import { AuthError } from "next-auth"
import { DEFAULT_ADMIN_REDIRECT, DEFAULT_PANITIA_REDIRECT } from "@/routes"
import { signIn } from "@/auth"
import { getUserByUsernameLogin } from "./get"
import { generateToken } from "@/lib/tokens"
import { Role } from "@prisma/client"

export const login = async(values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return{
            error: "Invalid fields...!"
        }
    }

    const { username, password } = validateFields.data;

    const existUser = await getUserByUsernameLogin(username);

    // if (!existUser || !existUser.username || !existUser.password) {
    //     return {
    //         error: "Email does not exist...!"
    //     }
    // }

    // if (!existUser.emailVerified){
    //     const verificationToken = await generateToken(existUser.email, existUser.username)

    //     return{
    //         success: "Confirmation email sent"
    //     }
    // }

    let redirectTo

    if(existUser?.role === Role.ADMIN) {
        redirectTo = DEFAULT_ADMIN_REDIRECT
    } else if(existUser?.role === Role.PANITIA) {
        redirectTo = DEFAULT_PANITIA_REDIRECT
    }

    try {
        await signIn("credentials",
        {
            username,
            password,
            redirectTo,
        })
    } catch (error) {
        if (error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error: "Invalid credential...!" }
                default:
                    return { error: "Something went wrong...!"}
            }
        }

        throw error
    }
}