
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";
import { FilterItem } from "@/types/globalTypes";
import { Button } from "./button";

type Props = {
    children: React.ReactNode
    filterItems: FilterItem[]
    setFilterItems: any
}

export const PopoverFilterTable = ({
    children,
    filterItems,
    setFilterItems,
}: Props) => {

    const handleChange = (value: string, filterName: string) => {
        setFilterItems((prevFilterItems: FilterItem[]) => {
            return prevFilterItems.map((filterItem) => {
                if (filterItem.filterName === filterName) {
                    const selectedIndex = filterItem.selected.indexOf(value);
                    if (selectedIndex === -1) {
                        return {
                            ...filterItem,
                            selected: [...filterItem.selected, value],
                        }
                    } else {
                        return {
                            ...filterItem,
                            selected: filterItem.selected.filter((item) => item !== value),
                        }
                    }
                }
                return filterItem;
            })
        })
    }

    const handleClearFilters = () => {
        setFilterItems((prevFilterItems: FilterItem[]) => {
            return prevFilterItems.map((filterItem) => ({
                ...filterItem,
                selected: [],
            }))
        })
    }

    
    return ( 
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                className="w-40" 
                side="bottom" 
                sideOffset={14}
            >
                {
                    filterItems.map((filter, i) =>(
                        <div 
                            key={i}
                            className="
                                space-y-2 
                                mb-4
                            "
                        >
                            <Label 
                                className="capitalize"
                            >
                                {filter.filterName}
                            </Label>
                            <Separator/>
                            {
                                Object.values(filter.item).map((value, j) => (
                                    <div
                                        key={j}
                                        className="
                                            flex 
                                            gap-2 
                                            items-center 
                                            p-2 
                                            rounded-md 
                                            hover:bg-muted 
                                            cursor-pointer
                                        "
                                    >
                                        <Checkbox 
                                            id={`${filter.filterName}-${value}-${j}`}
                                            checked={filter.selected.includes(value)}
                                            onCheckedChange={() => handleChange(value, filter.filterName)}
                                            
                                        />
                                        <Label htmlFor={`${filter.filterName}-${value}-${j}`}>
                                            {value}
                                        </Label>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <Separator/>
                <Button 
                    variant={"ghost"} 
                    className="w-full mt-1" 
                    size={"sm"}
                    onClick={handleClearFilters}
                >
                    Clear filters
                </Button>
            </PopoverContent>
        </Popover>
    )
}