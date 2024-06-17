import { cn } from "@/lib/utils";

type CardWrapperProps = {
    children: React.ReactNode
    className?: string
}
export const CardWrapper = ({children, className}: CardWrapperProps) => {
    return ( 
        <div 
            className={cn(`
                w-full
                p-4 
                rounded-lg 
                border 
                bg-card 
                text-card-foreground 
                shadow-sm`,
                className
            )}
        >
            { children }
        </div>
    );
}