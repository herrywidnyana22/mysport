import { CardLayout } from "@/components/layout/card-layout"
import { HeaderLayout } from "@/components/layout/header-layout"
import { MenuLayout } from "@/components/layout/menu-layout"

type PanitiaLayoutProps ={
    children: React.ReactNode
}

const PanitiaLayout = ({children}:PanitiaLayoutProps) =>{
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
                
                <HeaderLayout/>
                <CardLayout/>
                <MenuLayout/>
                { children }
            </div>
        </main>
    )
}

export default PanitiaLayout