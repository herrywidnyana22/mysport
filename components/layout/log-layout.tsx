import { CardWrapper } from "@/components/ui/card-wrapper";
import { LogActifityItem } from "./log-item";
import { CardTitle } from "../ui/card-title";

type Props = {
 
}
export const LogActivityLayout = ({}: Props) => {
    return ( 
        <CardWrapper className="w-1/3 p-2 pb-4 relative flex flex-col">
            <CardTitle label="Progress"/>
            <div className="space-y-2 overflow-y-auto mt-2 h-full">
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>
                <LogActifityItem/>

            </div>
        </CardWrapper>
    );
}