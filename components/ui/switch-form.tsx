import { cn } from "@/lib/utils";
import { FormItem, FormControl, FormLabel, FormDescription, FormMessage } from "./form";
import { Switch } from "./switch";

type SwitchFormProps = {
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void
    desc?: string
    withborder?: boolean
    isError?: boolean
    className?: string
}

export const SwitchForm = ({
    label,
    checked,
    onChange,
    desc,
    withborder=true,
    isError,
    className
}: SwitchFormProps) => {
    return ( 
        <FormItem 
            className={cn(`
                flex 
                flex-row
                gap-2 
                items-center 
                justify-between
                transition
                delay-1000
                duration-1000
                ease-in-out`,
                withborder && `
                rounded-md 
                border 
                p-3 `,
                isError && "border-rose-400",
                className
            )}
        >
            <div className="space-y-0.5">
                <FormLabel>
                    { label }
                </FormLabel>
                <FormDescription>
                    { desc }
                </FormDescription>
            </div>
            <FormControl>
                <Switch
                    checked={checked}
                    onCheckedChange={onChange}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}