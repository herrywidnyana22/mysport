'use server'

import bcrypt from "bcryptjs"
import { RegisterpSchema } from "@/lib/formSchema"
import { z } from "zod"
import { getUserByEmail, getUserByUsername } from "./get"
import { db } from "@/lib/db"
import { generateToken } from "@/lib/tokens"
import { ApiError, respon } from "@/types/api-respon"
import { uuidv7 } from "uuidv7"


export const addUser = async(formData: z.infer<typeof RegisterpSchema>) =>{
    const validateValues = RegisterpSchema.safeParse(formData)
    try {
        if(!validateValues.success){
            throw new ApiError({
                code: 400,
                status:"error",
                data: null,
                msg: "Invalid fields...!"
            })
        }

        const {
            name,
            username,
            email, 
            password
        } = validateValues.data

        const hashPassword = await bcrypt.hash(password, 10)

        const isEmailExist = await getUserByEmail(email)
        const isUsernameExist = await getUserByUsername(username)

        if(isEmailExist?.data){
            throw new ApiError({
                code: 409,
                status: "error",
                msg: "Email sudah pernah digunakan..!",
                data: null
            })
        }

        if(isUsernameExist.data){
            throw new ApiError({
                code: 409,
                status: "error",
                msg: "Username sudah pernah digunakan..!",
                data: null
            })
        }

        const newUser = await db.user.create({
            data:{
                id: uuidv7(),
                name,
                username,
                email,
                password: hashPassword,
                role:"ADMIN"
            }
        })

        const verificationToken = await generateToken(email, username)


        return respon({
            code: 201,
            status: "success",
            data: newUser,
            msg: "Konfirmasi sudah dikirim ke email anda, silahkan cek untuk verifikasi..!",
        })
        
    } catch (error) {
        return new ApiError({
            code: 500,
            status:"error",
            msg:"An error occurred while creating new user",
            data: null
        })
    }
}