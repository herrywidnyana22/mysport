"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { FormControl } from "./form"
import { useState } from "react"


type DatePickerProps ={
    placeholder: string,
    date: any
    setDate: any
}

export function DatePicker({
    placeholder,
    date,
    setDate,
}: DatePickerProps) {

  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(`
              pl-3 
              text-left 
              font-normal`,
              !date
              && "text-muted-foreground"
            )}
          >
            {
              date 
              ? (format(date, 'dd MMMM yyyy')) 
              : placeholder
            }
            <CalendarIcon 
              className="
                h-4 
                w-4 
                ml-auto 
                opacity-50
              " 
            />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent 
        align="center"
        className="
          w-auto 
          p-1
          pointer-events-auto
        " 
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(tgl) =>
            tgl < new Date() 
          }
          initialFocus
        />

         <Button
          onClick={() => setPopoverOpen(false)}
          variant="ghost"
          className="
            w-full
            mt-2 
            p-2 
            bg-blue-500 
            text-white 
            rounded-md
          "
          
        >
          Close
        </Button>
    </PopoverContent>
  </Popover>
  )
}
