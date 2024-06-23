import { CardWrapper } from "@/components/ui/card-wrapper";
import { LogActifityItem } from "../ui/log-item";
import { CardTitle } from "@/components/ui/card-title";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
 
}
export const LogActivityLayout = ({}: Props) => {
    return ( 
        <CardWrapper className="w-1/3 p-2 pb-4 relative flex flex-col">
            <CardTitle label="Progress"/>
            <ScrollArea className=" mt-2 h-full">
                <div className="space-y-2">
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

            </ScrollArea>
        </CardWrapper>
    );
}