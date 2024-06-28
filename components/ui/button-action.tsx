import { Loader2, LucideIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type Props = {
    label?: string
    type: "submit" | "button"
    variant: "text" | "icon"
    isPending: boolean
    disabled: boolean
    icon?: LucideIcon
    className?: string
    onClick?: () => void
    mode?: "primary" | "save" | "edit" | "delete"
}
export const ButtonAction = ({
    label,
    type, 
    variant,
    isPending,
    disabled,
    onClick,
    icon: Icon,
    mode= "primary",
    className
}: Props) => {
    return ( 
        <Button
            onClick={onClick}
            variant={mode}
            type={type}
            disabled={disabled} 
            className={cn(`
                uppercase 
                font-semibold 
                border 
                border-solid 
                border-transparent 
                text-sm 
                text-white`,
                variant==="text" && "w-full",
                variant==="icon" && "px-2",
                className
            )}
        >
            {
                isPending 
                ? variant === "text" && <Loader2 className="w-5 h-5 animate-spin" /> 
                : variant === "icon" && Icon ? <Icon className="w-4 h-4"/> : label 
            }
        </Button>
    );
}