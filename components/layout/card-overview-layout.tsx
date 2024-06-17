import { cn } from "@/lib/utils";
import { LucideIcon, Plus } from "lucide-react";
import { OverlayEffect } from "../ui/overlay-effect";

type CardOverViewProps = {
    label: string | number
    subLabel: string | number
    icon: LucideIcon
    newButtonAction?: () => void
    color?: "green" | "yellow" | "purple" | "red" | "blue" | "white"
}

export const CardOverViewLayout = ({
    icon: Icon,
    label,
    subLabel,
    newButtonAction,
    color = "white"
}: CardOverViewProps) => {
    return ( 
        <div 
            className={cn(`
                group 
                rounded-xl 
                text-gray-800 
                bg-${color}-100`,
                color === "white" && "border"
            )}
        >
            <div 
                className="
                    relative 
                    flex 
                    gap-1 
                    justify-between 
                    items-center
                    overflow-hidden
                    p-4 
                "
            >
                <div>
                    <div 
                        className="
                            font-bold 
                            text-2xl 
                            leading-none"
                        >
                            {label}
                    </div>
                    <div className="mt-2">
                        {subLabel}
                    </div>
                </div>
                <Icon
                    className="
                        group-hover:opacity-0 
                        transition-opacity
                    "
                />
                <button
                    type="button"
                    className={cn(`
                        absolute
                        right-4
                        p-1
                        z-20
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        outline-none
                        rounded-full
                        bg-zinc-300`
                    )}
                >
                    <Plus
                        className="
                            opacity-75
                            hover:opacity-100
                            transition-opacity
                            text-white
                        "
                    />
                </button>
                <OverlayEffect/>
            </div>
        </div>
    );
}