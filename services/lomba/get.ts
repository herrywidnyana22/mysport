import { db } from "@/lib/db"
import { respon } from "@/types/api-respon"

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