import { cn } from "@/lib/utils"

type TogglePanelProps = {
    title?: string
    content?: string
    className?: string
}
export const TogglePanel = ({title, content, className}: TogglePanelProps) => {
    return ( 
        <div
            className={cn(`
                absolute
                w-1/2
                h-full
                flex
                flex-col
                items-center
                justify-center
                top-0
                px-8
                text-center
                transition-all
                duration-700
                ease-in-out`,
                className
            )}
        >
            <h1 className="font-bold text-2xl">{title}</h1>
            <p className="text-sm leading-5 tracking-wide my-5">{content}</p>
        </div>
    );
}