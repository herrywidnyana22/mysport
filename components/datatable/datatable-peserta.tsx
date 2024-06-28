'use client'

import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
 
}
export const TablePeserta = ({}: Props) => {
    const user = useCurrentUser()
    return ( 
        <div>
            { user?.username }
        </div>
    );
}