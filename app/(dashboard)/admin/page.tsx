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

const AdminPage = async() =>{
    const user = await currentUser()
    const role = await currentRole()

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
                    <OverViewLayout/>
                </CardWrapper>
            </div>
        </main>
    )
}

export default AdminPage