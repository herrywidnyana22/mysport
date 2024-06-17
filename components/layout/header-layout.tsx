import { Avatar } from "@/components/ui/avatar";
import { AvatarMenuLayout } from "./avatar-menu-layout";

type Props = {
    
}
export const HeaderLayout = ({}: Props) => {
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
                PAGE TITLE
            </div>
            <AvatarMenuLayout
                side="bottom"
            >
                <Avatar/>
            </AvatarMenuLayout>
        </div>
    );
}