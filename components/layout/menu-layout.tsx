
import { DatatableComponent } from "@/app/(dashboard)/admin/[datatable]/page"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/router"

type MenuLayoutProps={
    activeMenu?: string
}

export const MenuLayout = ({activeMenu}: MenuLayoutProps) =>{
    return(
        <>
            <div
                className="
                    flex 
                    gap-2 
                    p-1
                    bg-muted
                    text-muted-foreground
                    text-sm
                    rounded-md
                    transition
                "
            >
                <div
                    className="
                        font-semibold
                        p-[6px]
                        px-4
                        capitalize
                    "
                >
                    <Link href={'/admin'}>
                        Overview
                    </Link>

                </div>
                {Object.keys(DatatableComponent).map((key) => (
                        <div
                            key={key} 
                            className={cn(`
                                font-semibold
                                p-[6px]
                                px-4
                                capitalize
                                transition`,
                                activeMenu === key && `
                                bg-background
                                rounded-sm
                                shadow-sm
                                text-black`
                            )}
                        >
                            <Link href={`/admin/${key}`}>
                                {key}
                            </Link>
                        </div>
                ))}
            </div>
        </>
    )
}