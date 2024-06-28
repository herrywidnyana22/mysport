'use client'

import { CardLayout } from "@/components/layout/card-layout"
import { HeaderLayout } from "@/components/layout/header-layout"
import { MenuLayout } from "@/components/layout/menu-layout"
import { useCurrentUser } from "@/hooks/use-current-user"

type MainAdminLayoutProps ={
    children: React.ReactNode
    params:{
        datatable: string
    }
}

const MainAdminLayout = ({children, params}:MainAdminLayoutProps) =>{
    const user = useCurrentUser()

    return(
        <main
            className="
                container
                relative
                py-4
                max-w-6xl
            "
        >
            {JSON.stringify({user})}
            <div    
                className="
                    flex
                    flex-col
                    gap-4
                "
            >
                
                <HeaderLayout title="Lomba"/>
                <CardLayout/>
                <MenuLayout activeMenu = {params.datatable}/>
                { children }
            </div>
        </main>
    )
}

export default MainAdminLayout