'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from "@/components/ui/select"
import { useState } from "react"
import { Button } from "./button"
import { Check, Plus, X } from "lucide-react"
import { InputText } from "./input-text"
import { ButtonAction } from "./button-action"

type OptionProps = {
    label: string
    data: any
}
export const OptionSelect = ({
    label,
    data
}: OptionProps) => {
    const [addMode, setAddMode] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const toggleMode = () =>{
        setAddMode(!addMode)
    }
    return ( 
        <Select>
            <SelectTrigger className="w-full">
            <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>
                        {label}
                    </SelectLabel>
                    <SelectSeparator/>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    <SelectItem value="a">Pineapple</SelectItem>
                    <SelectItem value="b">Pineapple</SelectItem>
                    <SelectItem value="d">Pineapple</SelectItem>
                    <SelectItem value="c">Pineapple</SelectItem>
                    <SelectItem value="e">Pineapple</SelectItem>
                    <SelectItem value="f">Pineapple</SelectItem>
                    <SelectItem value="g">Pineapple</SelectItem>
                    <SelectItem value="h">Pineapple</SelectItem>
                    <SelectItem value="i">Pineapple</SelectItem>
                    <SelectItem value="j">Pineapple</SelectItem>
                    <SelectItem value="k">Pineapple</SelectItem>
                    <SelectItem value="l">Pineapple</SelectItem>
                    <SelectItem value="m">Pineapple</SelectItem>
                    <SelectItem value="n">Pineapple</SelectItem>
                    <SelectItem value="o">Pineapple</SelectItem>
                    <SelectItem value="p">Pineapple</SelectItem>
                    <SelectSeparator/>
                </SelectGroup>
                {
                    !addMode
                    ?   (
                            <Button
                                onClick={toggleMode}
                                type="button"
                                variant={"ghost"}
                                className="
                                    w-full 
                                    flex 
                                    items-center 
                                    justify-center 
                                    gap-2 
                                    text-muted-foreground
                                "
                            >
                                <Plus
                                    className="w-4 h-4"
                                    />
                                {`Tambah ${label}`}
                            </Button>
                        )
                    :   (<form>
                            <div
                                className="
                                    w-full
                                    flex
                                    justify-between 
                                    gap-2
                                    p-2
                                "
                            >
                                <InputText
                                    label={label}
                                    placeholder={`Masukkan ${label}`}
                                />
                                <div className="space-x-2">
                                    <ButtonAction
                                        mode="save"
                                        type="submit"
                                        variant="icon"
                                        disabled={isPending}
                                        isPending={isPending}
                                        icon={Check}
                                    />
                                    <ButtonAction
                                        onClick={toggleMode}
                                        mode="delete"
                                        type="button"
                                        variant="icon"
                                        disabled={isPending}
                                        isPending={isPending}
                                        icon={X}
                                    />
                                </div>
                                
                            </div>
                        </form>)
                }                    
            </SelectContent>

        </Select>
    )
}
