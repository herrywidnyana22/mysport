'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hint } from "../ui/hint"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { InputText } from "@/components/ui/input-text"
import { ButtonAction } from "@/components/ui/button-action"
import { LombaForm } from "../ui/lomba-form"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { ScrollArea } from "../ui/scroll-area"


export const DialogAddLomba = () => {
    const [isPending, setIsPending] = useState(false)

    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <div 
                    className="
                        absolute 
                        right-4 
                        z-20
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                    "
                >
                    <Hint 
                        label="Tambah Baru" 
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
                            <Plus
                                className="
                                    opacity-75
                                    hover:opacity-100
                                    transition-opacity
                                    text-white
                                "
                            />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent 
                className="
                    sm:max-w-[425px]
                "
            >
                <DialogHeader>
                    <DialogTitle>
                        Tambah Lomba Baru
                    </DialogTitle>
                    <DialogDescription>
                        Tambah baru turnamen, 
                        lengkapi semua data kemudian lanjut dengan menambah panitia yg bertugas 
                    </DialogDescription>
                </DialogHeader>
                <LombaForm/>
            </DialogContent>
        </Dialog>
    );
}