import { TableLomba } from "@/components/datatable/datatable-lomba"
import { TablePeserta } from "@/components/datatable/datatable-peserta"
import { TableUser } from "@/components/datatable/datatable-user"
import useDataTable from "@/hooks/use-datatable"
import { currentUser } from "@/lib/auth"
import { createElement } from "react"

type DataPageProps = {
    params:{
        datatable: string
    }
}

export const DatatableComponent: any ={
    users: TableUser,
    peserta: TablePeserta,
    lomba: TableLomba
}

const DataPage = async({
    params
}: DataPageProps) => {

    const data = await useDataTable(params.datatable)

    return ( 
        <div>
        {
            typeof DatatableComponent[params.datatable] !== "undefined"
            && createElement(DatatableComponent[params.datatable], 
                { 
                    data,
                })
        }
        </div>
    )
}

export default DataPage