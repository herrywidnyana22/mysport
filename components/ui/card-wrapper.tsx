import { cn } from "@/lib/utils";

type CardWrapperProps = {
    children: React.ReactNode
    isError?: boolean
    className?: string
}
export const CardWrapper = ({
    children,
    isError, 
    className

}: CardWrapperProps) => {
    return ( 
        <div 
            className={cn(`
                w-full
                p-4 
                rounded-lg 
                border 
                bg-card 
                text-card-foreground 
                shadow-md`,
                isError && "border-rose-400",
                className
            )}
        >
            { children }
        </div>
    );
}