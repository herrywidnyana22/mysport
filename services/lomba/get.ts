'get server'

import { db } from "@/lib/db"
import { ApiError, respon } from "@/types/api-respon"

export const getLombaCount = async() =>{
    try {
        const lombaCount = await db.lomba.count({
            where: {
                isEnded: true
            }
        })
        console.log({lombaCount})
        return respon({
            code: 200,
            status: "success",
            msg: "Total panita berhasil di request",
            data: lombaCount
        })
    } catch (error) {
        respon({
            code: 500,
            status: "error",
            msg: "An error occurred while retrieving users",
            data: null
        })
    }
}

export const getLombaByName = async(lombaName: string) =>{
    try {
        const getLomba = db.lomba.findUnique({
            where:{
                lombaName
            }
        })

        if(!getLomba){
            return respon({
                code: 404,
                status:"error",
                msg: "lomba not found",
                data: null
            })
        }

        return respon({
            code: 200,
            status: "success",
            data: getLomba,
            msg: "lomba retrieved successfully",
        })

    } catch (error) {
        respon({
            code: 500,
            status: "error",
            msg: "An error occurred while retrieving lomba",
            data: null
        })
    }
}

export const getLombaData = async() =>{
    try {
        const lombaData = await db.lomba.findMany({
            
            include:{
                pos:{
                    select:{
                        id: true,
                        posName: true,
                        isPosFinish: true,
                        user:{
                            select:{
                                id: true,
                                name: true
                            }
                        }
                    }, 
    
                    orderBy:{
                        isPosFinish: 'asc'
                    }
                }
            }
        })
        
        return respon({
            code: 200,
            status: "success",
            msg: "Berhasil memperoleh data lomba",
            data: lombaData
        })
    } catch (error) {
        throw new ApiError({
            code: 500,
            status: "error",
            msg: "Error when get lomba data",
            data: null
        })
    }

    
}
