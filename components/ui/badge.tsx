import { cn } from "@/lib/utils"
import { LombaStatus } from "@prisma/client"

type BadgeProps = {
    children: React.ReactNode
    variant?: 
    "pink" | "process" | 
    "finish" | "danger" | 
    "primary" | "outline" | 
    "secondary" | "default" |
    LombaStatus
    className?: string
}

export const Badge = ({
    children,
    variant= "default",
    className
}: BadgeProps) => {
    return ( 
        <div
            className={cn(`
                flex
                items-center
                justify-center
                px-1.5 
                py-0.5
                rounded-lg 
                text-xs 
                text-white
                cursor-default`,
                variant === "pink" && "bg-pink-400 hover:bg-pink-600/80",
                variant === "primary" && "bg-indigo-500 hover:bg-indigo-600/80",
                variant === "secondary" && "bg-secondary/80 hover:bg-secondary",
                variant === "danger" || variant ===  LombaStatus.Finished && "bg-rose-500 hover:bg-rose-600/80",
                variant === "process" || variant ===  LombaStatus.InProgress && "bg-amber-500 hover:bg-amber-600/80",
                variant === "finish" ||  variant ===  LombaStatus.Ongoing && "bg-emerald-500 hover:bg-emerald-600/80",
                variant === "default" && "bg-zinc-800 hover:bg-zinc-800/80",
                variant === "outline" && "border bg-transparent",
                className

            )}
        >
            {children}
        </div>
    );
}