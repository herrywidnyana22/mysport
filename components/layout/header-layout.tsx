'use client'

import { Avatar } from "@/components/ui/avatar";
import { AvatarMenuLayout } from "./avatar-menu-layout";
import { useCurrentRole } from "@/hooks/use-current-role";
import { CardTitle } from "../ui/card-title";

type HeaderProps = {
    title: string
}
export const HeaderLayout = ({title}: HeaderProps) => {
    const userRole = useCurrentRole()
    return ( 
        <div
            className="
                py-2
                mt-4
                flex
                justify-between
                items-center
            "
        >
            <div
                className="
                    text-xl
                    font-bold
                "
            >
                {title}
            </div>
            <AvatarMenuLayout
                side="bottom"
            >
                <div 
                    className="
                        flex 
                        gap-1 
                        items-center
                    "
                >
                    <CardTitle label={userRole}/>
                    <Avatar/>
                </div>
            </AvatarMenuLayout>
        </div>
    );
}