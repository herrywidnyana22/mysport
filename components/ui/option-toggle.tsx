

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { FormControl, FormItem } from "./form"
import { cn } from "@/lib/utils"

type OptionToggleProps={
    data: string[]
    initValue: string
    onChange: () => void
}

export function OptionToggle({
    data,
    initValue,
    onChange
}: OptionToggleProps) {
  return (
    <ToggleGroup 
        type="single" 
        size="sm" 
        variant={"outline"}
        onValueChange={onChange}
        value={initValue}
        className=""
    >
        {
            data.map((item: string, i: number) =>(
                <FormItem 
                    key={i}
                    className="
                        flex 
                        space-y-0
                        gap-1
                    "
                >
                    <FormControl>
                        <ToggleGroupItem 
                            value={item} 
                            aria-label={`Toggle ${item}`}
                            className={initValue === item ? "border-indigo-500" : ""}
                        >
                            {item}
                        </ToggleGroupItem>
                    </FormControl>

                </FormItem>
            ))
        }
    </ToggleGroup>
  )
}
