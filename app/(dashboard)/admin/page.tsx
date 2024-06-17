import { auth, signOut } from "@/auth";
import { DataTableLayout } from "@/components/layout/datatable-layout";
import { InputGroupLayout } from "@/components/layout/input-group";
import { LogActivityLayout } from "@/components/layout/log-layout";
import { Button } from "@/components/ui/button";
import { currentRole } from "@/lib/auth";

const AdminPage = async() =>{
    const userRole = await currentRole()

    return(
        <>
        {JSON.stringify({userRole})}
        <DataTableLayout/>
        </>
    )
}

export default AdminPage