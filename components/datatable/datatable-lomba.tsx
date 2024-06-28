'use client'

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CirclePlus, Flag, MoreHorizontal, Trash2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CardWrapper } from "@/components/ui/card-wrapper";
import { Lomba, Pos } from "@prisma/client";
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { OptionAction } from "@/components/ui/option-action"
import { ButtonAction } from "@/components/ui/button-action"
import { Separator } from "@/components/ui/separator"
import { PopoverFilterTable } from "@/components/ui/popover-filter"

type DatatableLombaProps = {
    data: Lomba[]
}

export enum LombaStatus {
    Ongoing,
    InProgress,
    Finished
}

export const tableHeadItem=[
    { id: 'checkbox', content: <Checkbox /> },
    { id: 'namaLomba', content: 'Nama Lomba' },
    { id: 'tanggal', content: 'Tanggal' },
    { id: 'category', content: 'Category' },
    { id: 'pos', content: 'Pos' },
    { id: 'status', content: 'Status' },
    { id: 'action', content: null },
]

export const TableLomba = ({data}: DatatableLombaProps) => {
    console.log({data})
    return ( 
        <CardWrapper
            className="space-y-4"
        >
            <div className="pb-4">
                <h1 className="text-xl font-bold">List Lomba</h1>
                <p className="text-muted-foreground">Ini adalah data semua lomba yg tercatat</p>
            </div>
            <div
                className="
                    flex
                    justify-start
                    gap-4
                    w-auto
                "
            >
                <Input
                    type="text"
                    placeholder="Cari nama lomba"
                    className="max-w-40"
                />
                
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            border
                            border-dashed
                            rounded-md
                            px-4
                            py-2
                            shadow-sm
                            cursor-pointer
                            hover:bg-muted
                            font-semibold
                        "
                    >
                        <PopoverFilterTable>
                            <div className="flex gap-1">
                                <CirclePlus className="w-3 h-3"/>
                                <p className="text-xs">Filter</p>
                            </div>
                        </PopoverFilterTable>
                        <Separator orientation="vertical"/>
                        <div className="flex gap-1 items-center">
                            <div className="bg-muted p-1 px-2 rounded-md text-muted-foreground">
                                <p className="text-xs">Tambah</p>
                            </div>
                            <div className="bg-muted p-1 px-2 rounded-md text-muted-foreground">
                                <p className="text-xs">Tambah</p>
                            </div>
                            <div className="bg-muted p-1 px-2 rounded-md text-muted-foreground">
                                <p className="text-xs">Tambah</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                        {
                            tableHeadItem.map((head) => (
                                <TableHead key={head.id} className="text-center">
                                    {head.content}
                                </TableHead>
                            )
                        )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                        data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell>
                                    { item.lombaName }
                                </TableCell>
                                <TableCell>
                                    { 
                                        item.isDateSet
                                        ? (item.startAt ? format(item.startAt, 'dd MMMM yyyy') : <p>No start date</p>) 
                                        : "Jadwal random"
                                    }
                                </TableCell>
                                <TableCell className="flex flex-col gap-1">
                                    <div>
                                        { 
                                            item.isRegister
                                            ? <Badge variant="Finished">Register</Badge> 
                                            : <Badge variant="primary">Non Register</Badge> 
                                        }
                                    </div>
                                    <div>
                                        {
                                            item.genre === 'Gabungan' ? (
                                                <Badge variant="default">{item.genre}</Badge>
                                            ) : item.genre === 'Wanita' ? (
                                                <Badge variant="pink">{item.genre}</Badge>
                                            ) : item.genre === 'Pria' ? (
                                                <Badge variant="primary">{item.genre}</Badge>
                                            ) : null
                                        }
                                    </div>
                                    <div className="text-center border rounded-lg bg-muted text-muted-foreground">
                                        { 
                                            item.isAgeSet 
                                            ? `${item.minAge} - ${item.maxAge} Tahun`
                                            : <Badge variant="process">Semua umur</Badge>
                                        }
                                    </div>
                                    
                                </TableCell>
                               
                                <TableCell>
                                    <div className="space-y-1">
                                    {
                                        item.pos?.map((posItem: Pos, i: number) =>(
                                            <div 
                                                key={i}
                                                className="
                                                    flex 
                                                    items-center
                                                    gap-1
                                                    p-1
                                                    px-2 
                                                    rounded-lg
                                                    border
                                                "
                                            >
                                                {posItem.posName}
                                                {posItem.isPosFinish && (
                                                    <Flag className="w-3 h-3"/>
                                                )}
                                            </div>
                                        ))
                                    }
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.status}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <OptionAction
                                        editAction={() =>{}}
                                        deleteAction={() =>{}}
                                    />
                                </TableCell>
                            </TableRow>

                        ))
                    }
                    </TableBody>
                </Table>
            </div>
            <div
                className="
                    flex
                    justify-between
                    items-center
                "
            >
                <div
                    className="
                        flex
                        gap-4
                        items-center
                    "
                >
                    <ButtonAction 
                        type="button"
                        mode="delete" 
                        icon={Trash2}
                        variant="icon"
                        disabled={false}
                        isPending={false}
                    />
                    <div className="text-muted-foreground text-sm">
                        <p>0 / 100 data dipilih.</p>
                    </div>

                </div>
                <div
                    className="
                        flex
                        gap-2
                        items-center
                    "
                >
                    <span className="mr-10 font-semibold text-md">Halaman 1 of 10</span>
                    <div 
                        className="
                            p-2 
                            border 
                            rounded-md 
                            shadow-sm 
                            cursor-pointer 
                            hover:bg-muted
                        "
                    >
                        <ChevronsLeft className="h-4 w-4"/>
                    </div>
                    <div 
                        className="
                            p-2 
                            border 
                            rounded-md 
                            shadow-sm 
                            cursor-pointer 
                            hover:bg-muted
                        "
                    >
                        <ChevronLeft className="h-4 w-4"/>
                    </div>
                    <div 
                        className="
                            p-2 
                            border 
                            rounded-md 
                            shadow-sm 
                            cursor-pointer 
                            hover:bg-muted
                        "
                    >
                        <ChevronRight className="h-4 w-4"/>
                    </div>
                    <div 
                        className="
                            p-2 
                            border 
                            rounded-md 
                            shadow-sm 
                            cursor-pointer 
                            hover:bg-muted
                        "
                    >
                        <ChevronsRight className="h-4 w-4"/>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
}
