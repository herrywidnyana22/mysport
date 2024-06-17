'use client'
import { Link2, LogOut, Pencil, Trash2 } from "lucide-react"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { onLogout } from "@/services/auth/logout"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user"


interface AvatarMenuProps{
    children: React.ReactNode
    side?: DropdownMenuContentProps["side"]
    sideOffset?: DropdownMenuContentProps["sideOffset"]
    setEditedData?: any
}

export const AvatarMenuLayout = ({
    children,
    side,
    sideOffset
}: AvatarMenuProps) => {

    const [isLoading, setIsLoading] = useState(false)

    const user = useCurrentUser()

    const handleLogout = async() =>{
        try {
            setIsLoading(true)
            await onLogout()
        } catch (error) {
            toast.error("Logout failed")
        } finally{
            setIsLoading(false)
        }
    }


    return (
        
        <DropdownMenu>
            <DropdownMenuTrigger>
                { children }
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                className="
                    absolute
                    flex
                    flex-col
                    w-40
                    -right-6
                "
            >
                <div className="p-2">
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-[10px] text-muted-foreground">{user?.email}</p>
                </div>
                <Separator/>
                <DropdownMenuItem
                    className="
                        flex
                        items-center
                        justify-between
                        p-2
                        cursor-pointer
                        text-xs
                    "
                >
                    Add Category
                    <Link2
                        className="
                            w-4
                            h-4
                        "
                    />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="
                        flex
                        items-center
                        justify-between
                        p-2
                        cursor-pointer
                        text-xs
                    "
                >
                    Add Panitia
                    <Pencil
                        className="
                            w-4
                            h-4
                        "
                    />
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        justify-between
                        gap-2
                        p-2
                        text-rose-500
                        cursor-pointer
                        text-sm
                    "
                >
                    Logout
                    <LogOut className="w-4 h-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}