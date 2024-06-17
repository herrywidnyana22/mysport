
import { Avatar } from "@/components/ui/avatar";
import { AvatarMenuLayout } from "./avatar-menu-layout";

type HeaderProps = {
    title: string
}
export const HeaderLayout = ({title}: HeaderProps) => {
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
                <Avatar/>
            </AvatarMenuLayout>
        </div>
    );
}