import { getVerificationTokenByEmail } from "@/services/auth/verification-token"
import { v4 as uuidv4 } from "uuid"
import { db } from "./db"

export const generateToken = async (email: string, username: string) =>{
    const token = uuidv4()
    const expiresToken = new Date(new Date().getTime() + 3600*1000 )
    
    const existToken = await getVerificationTokenByEmail(email)

    if(existToken){
       await db.verificationToken.delete({
        where:{
            id: existToken.id
        }
       }) 
    }

    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            username,
            token,
            expires: expiresToken
        }
    })

    return verificationToken
}