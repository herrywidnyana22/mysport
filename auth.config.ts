
import type { NextAuthConfig } from "next-auth"

import bcrypt from "bcryptjs"
import credentials from "next-auth/providers/credentials"

import { LoginSchema } from "./lib/formSchema"
import { getUserByUsernameLogin } from "./services/auth/get"
 
export default { 
    providers: [
        credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials)

                if(validateFields.success){
                    const { username, password } = validateFields.data

                    const user = await getUserByUsernameLogin(username)
                    if(!user || !user.password) return null

                    const isPasswordMatch = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if(isPasswordMatch) return user
                }

                return null
            },
        })
    ] 
} satisfies NextAuthConfig