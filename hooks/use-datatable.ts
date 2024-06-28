import { PrismaClient, Role } from "@prisma/client"
// import getCurrentUser from "./getCurrentUser"
import { db } from "@/lib/db"
import { getLombaData } from "@/services/lomba/get"


const useDataTable = async(menu: keyof PrismaClient | any) => {
    let data: any[]= []


    try {
        switch (menu) {
            case "lomba":
                const request =  await getLombaData()
                data = request.data
                break
            
            case "user":
                data = []
            break

            case "peserta":
                data = []
            break
                
            default:
                break;
        }

        
        return data

    } catch (error) {
        return []
    }
}
    


export default useDataTable