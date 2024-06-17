
import { DataTableLayout } from "@/components/layout/datatable-layout"
import { InputGroupLayout } from "@/components/layout/input-group"
import { LogActivityLayout } from "@/components/layout/log-layout"

const PanitiaPage = () =>{
    return(
        
        <div className="flex gap-2 max-h-[580px]">
            <div className="flex flex-col gap-2 w-full h-full">
                <DataTableLayout/>
                <InputGroupLayout/>
            </div>
            <LogActivityLayout/>
        </div>
    )
}

export default PanitiaPage