import { db } from "@/lib/db"
import { respon } from "@/types/api-respon"

export const getUserByID = async(id: string)=>{
    try {
        const user = await db.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
            return respon({
                code: 404,
                status: "error",
                msg: "User not found",
                data: null
            })
        }

        return respon({
            code: 200,
            status: "success",
            msg: "User retrieved successfully",
            data: user
        })

    } catch (error) {
        return respon({
            code: 500,
            status:"error",
            msg: "An error occurred while retrieving users",
            data: null
        })
    }
}

export const getUserByEmail = async(email: string) =>{
    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return respon({
                code: 404,
                status:"error",
                msg: "User not found",
                data: null
            })
        }

        return respon({
            code: 200,
            status: "success",
            data: user,
            msg: "User retrieved successfully",
        })

    } catch (error) {
        return respon({
            code: 500,
            status:"error",
            msg: "An error occurred while retrieving users",
            data: null
        })
    }
}


export const getUserByUsername = async(username: string) =>{
    try {
        const user = await db.user.findUnique({
            where:{
                username
            }
        })

        if(!user){
            return respon({
                code: 404,
                status:"error",
                msg: "User not found",
                data: null
            })
        }

        return respon({
            code: 200,
            status: "success",
            data: user,
            msg: "User retrieved successfully",
        })

    } catch (error) {
        return respon({
            code: 500,
            status:"error",
            msg: "An error occurred while retrieving users",
            data: null
        })
    }
}


export const getAllUser = async() => {
    try {
        const users = await db.user.findMany()

        if(!users){
            return respon({
                code: 404,
                status:"error",
                msg: "User not found",
                data: null
            })
        }

        return respon({
            code: 200,
            status: "success",
            data: users,
            msg: "Users retrieved successfully",
        })
    } catch (error) {
        return respon({
            code: 500,
            status:"error",
            msg: "An error occurred while retrieving users",
            data: null
        })
    }
}