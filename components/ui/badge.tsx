import { cn } from "@/lib/utils"

type BadgeProps = {
    children: React.ReactNode
    variant?: "process" | "finish" | "danger" | "primary" | "outline" | "secondary" | "default"
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
                variant === "primary" && "bg-indigo-500 hover:bg-indigo-600/80",
                variant === "secondary" && "bg-secondary/80 hover:bg-secondary",
                variant === "danger" && "bg-rose-500 hover:bg-rose-600/80",
                variant === "process" && "bg-amber-500 hover:bg-amber-600/80",
                variant === "finish" && "bg-emerald-500 hover:bg-emerald-600/80",
                variant === "default" && "bg-zinc-800 hover:bg-zinc-800/80",
                variant === "outline" && "border bg-transparent",
                className

            )}
        >
            {children}
        </div>
    );
}