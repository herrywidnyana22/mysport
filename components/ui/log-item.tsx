import { CardWrapper } from "@/components/ui/card-wrapper";
import { Badge } from "@/components/ui/badge";
import { Hourglass } from "lucide-react";
import { Hint } from "./hint";

type Props = {
 
}
export const LogActifityItem = ({}: Props) => {
    return ( 
        <CardWrapper className="p-2">
            <div
                className="
                    flex
                    flex-col
                    gap-1
                "
            >
                <div 
                    className="
                        flex 
                        justify-between
                    "
                >
                    <h2 className="font-semibold text-sm">001</h2>
                    <p className="text-xs text-muted-foreground">datetime</p>
                </div>
                <div className="text-muted-foreground text-xs">
                    <p>Sudah melewati pos 2</p>
                </div>
                <div
                    className="
                        flex
                        justify-between
                        mt-3
                    "
                >
                    <div className="flex gap-0.5 ">
                        <Badge variant="secondary" className="text-[10px] text-zinc-700">Pos 1</Badge>
                        <Badge variant="secondary" className="text-[10px] text-zinc-700">Pos 2</Badge>
                        <Badge variant="outline" className="text-[10px] text-zinc-700">Pos 3</Badge>
                    </div>
                    <div>
                        <Hint
                            label="On Running"
                            side="top"
                            align="center"
                        >
                            <Badge variant="process" className="p-1">
                                <Hourglass className="w-3 h-3"/>
                            </Badge>
                        </Hint>
                    </div>
                </div>
            </div>

        </CardWrapper>
    );
}