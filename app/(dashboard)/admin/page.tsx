import { auth, signOut } from "@/auth";
import { DataTableLayout } from "@/components/layout/datatable-layout";
import { HeaderLayout } from "@/components/layout/header-layout";
import { InputGroupLayout } from "@/components/layout/input-group";
import { LogActivityLayout } from "@/components/layout/log-layout";
import { OverViewLayout } from "@/components/layout/overview-layout";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { currentRole, currentUser } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import { getLombaCount } from "@/services/lomba/get";
import { getBestWaktuInCategory, getMostPesertaByCategory, getPesertaCount } from "@/services/peserta/get";
import { getPanitiaCount } from "@/services/users/get";
import { getCategoryNameWithMostPeserta } from "@/services/category/get";

const AdminPage = async() =>{
    const user = await currentUser()
    const role = await currentRole()

    const getTotalLombaSelesai = async() =>{
        const count = await getLombaCount()

        if(!count?.data) return "-"

        return count.data
    }
    const getTotalPeserta = async() =>{
        const count = await getPesertaCount()
        if(!count?.data) return "-"

        return count.data
    }
    const getTotalPanitia = async() =>{
        const count = await getPanitiaCount()
        if(!count?.data) return "-"

        return count.data
    }

    const bestTimeByCategory = async() =>{
        const time = await getBestWaktuInCategory()
         if(!time?.data) return "-"

        return time.data
    }

    const mostPeserta = async() =>{
        const count = await getMostPesertaByCategory()
        if(!count?.data) return "-"

        return count.data
    }

    const categoryWithMostPeserta = async() =>{
        const count = await getCategoryNameWithMostPeserta()
        if(!count?.data) return "-"

        return count.data
    }

    const data = {
        totalLomba: await getTotalLombaSelesai(),
        totalPeserta: await getTotalPeserta(),
        totalPanitia: await getTotalPanitia(),
        user,
        mostPeserta: await mostPeserta(),
        popularCategory: await categoryWithMostPeserta()
    }

    return(
        <main
            className="
                container
                relative
                py-4
                max-w-6xl
            "
        >
            <div    
                className="
                    flex
                    flex-col
                    gap-4
                "
            >
                <HeaderLayout title="Running"/>
                <Separator/>
                <CardWrapper
                    className="
                        shadow-none
                        p-6
                    "
                >
                    <OverViewLayout
                        data= {data}
                    />
                </CardWrapper>
            </div>
        </main>
    )
}

export default AdminPage