import { User, Pos, Peserta, Category,  } from "@prisma/client";

interface ApiResponProps{
    code: number, 
    status: 'success' | 'error', 
    msg: string, 
    data: any
}

export const respon = ({
    code,
    status,
    msg,
    data
}: ApiResponProps) => ({
    code,
    status,
    msg,
    data,
})

export class ApiError extends Error {
    code: number
    status: 'success' | 'error'
    data: any

    constructor({ code, status, msg, data }: ApiResponProps) {
        super(msg)
        this.code = code
        this.status = status
        this.data = data
    }
}