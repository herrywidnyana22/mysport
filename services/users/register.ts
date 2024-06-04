'use server'

import bcrypt from "bcryptjs"
import { RegisterpSchema } from "@/lib/formSchema"
import { z } from "zod"
import { v } from "convex/values"

export const register = async(formData: z.infer<typeof RegisterpSchema>){
    const validateValues = RegisterpSchema.safeParse(formData)

    if(!validateValues.success){
        return{
            error: "Invalid fields...!"
        }
    }

    const {
        name,
        email, 
        password
    } = validateValues.data

    const hashPassword = await bcrypt.hash(password, 10)


}