
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";

type Props = {
    children: React.ReactNode
}

export const PopoverFilterTable = ({
    children
}: Props) => {
    return ( 
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-40" side="bottom" sideOffset={14}>
                <div className="space-y-2 mb-4">
                    <Label>Status</Label>
                    <Separator/>
                    <div className="flex gap-2 items-center p-2 rounded-md hover:bg-muted cursor-pointer">
                        <Checkbox id="ongoing"/>
                        <Label htmlFor="ongoing">
                            Ongoing
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center p-2 rounded-md hover:bg-muted cursor-pointer">
                        <Checkbox id="inprogress"/>
                        <Label htmlFor="inprogress">
                            InProgress
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center p-2 rounded-md hover:bg-muted cursor-pointer">
                        <Checkbox id="finished"/>
                        <Label htmlFor="finished">
                            Finished
                        </Label>
                    </div>

                </div>
                <div className="space-y-2 mb-4">
                    <Label>Status</Label>
                    <Separator/>
                    <div className="flex gap-2 items-center p-2 rounded-md hover:bg-muted cursor-pointer">
                        <Checkbox id="ongoing"/>
                        <Label htmlFor="ongoing">
                            Ongoing
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center p-2 rounded-md hover:bg-muted cursor-pointer">
                        <Checkbox id="inprogress"/>
                        <Label htmlFor="inprogress">
                            InProgress
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center p-2 rounded-md hover:bg-muted cursor-pointer">
                        <Checkbox id="finished"/>
                        <Label htmlFor="finished">
                            Finished
                        </Label>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    );
}