'use client'

import { cn } from "@/lib/utils";
import { Eye, LucideIcon, Plus } from "lucide-react";
import { OverlayEffect } from "../ui/overlay-effect";
import { Hint } from "../ui/hint";
import Link from "next/link";

type CardOverViewProps = {
    label: string | number
    subLabel: string | number
    icon: LucideIcon
    viewUrl?: string
    newAction?: React.ReactNode
    color?: "green" | "yellow" | "purple" | "red" | "blue" | "white" | "cyan" | "orange" | "pink"
}

export const CardOverViewLayout = ({
    icon: Icon,
    label,
    subLabel,
    viewUrl,
    newAction,
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
                
                {
                    viewUrl && (
                    <Link
                        href={viewUrl}
                        className="
                            absolute left-4 z-20
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity
                        "
                    >
                        <Hint 
                            label="View data" 
                            side="top"
                        >
                            <button
                                type="button"
                                className={cn(`
                                    p-1
                                    outline-none
                                    rounded-full
                                    bg-zinc-300`
                                )}
                            >
                                <Eye
                                    className="
                                        opacity-75
                                        hover:opacity-100
                                        transition-opacity
                                        text-white
                                    "
                                />
                            </button>
                        </Hint>
                    </Link>
                )}
                { newAction && newAction }
                <OverlayEffect/>
            </div>
        </div>
    );
}