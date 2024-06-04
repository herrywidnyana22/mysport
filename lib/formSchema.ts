
import {z} from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email tidak boleh kosong"
    }),
    password: z.string().min(1, {
        message: "Password tidak boleh kosong"
    })
})

export const RegisterpSchema =  z.object({
    name: z.string().min(1, "Name tidak boleh kosong"),
    username: z.string().min(1, "username boleh kosong"),
    email: z.string()
        .min(1, "Email tidak boleh kosong" )
        .email("Email tidak valid"),
    password: z.string()
        .min(6, {
            message: "Password minimal 6 karakter"
        })
})