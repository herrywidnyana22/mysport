'use client'

import {useCallback} from "react"

import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CirclePlus, Flag, MoreHorizontal, Trash2 } from "lucide-react"
 
import { Checkbox } from "@/components/ui/checkbox"

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
import { Genre, Lomba, LombaStatus, Pos } from "@prisma/client";
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { OptionAction } from "@/components/ui/option-action"
import { ButtonAction } from "@/components/ui/button-action"
import { Separator } from "@/components/ui/separator"
import { PopoverFilterTable } from "@/components/ui/popover-filter"
import { useState } from "react"
import { FilterItem } from "@/types/globalTypes"

type DatatableLombaProps = {
    data: Array<Lomba & { 
            pos: Pos[] 
        }>
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

    const filter: FilterItem[] = [
        {
            filterName: "status",
            item: LombaStatus,
            selected: []
        },
        {
            filterName: "genre",
            item: Genre,
            selected: []
        },
        {
            filterName: "mode",
            item: {
                Register: "Register",
                NonRegister: "Non Register"
            },
            selected: []
        }
    ]

    const itemsPerPage = 5

    const [isPending, setIsPending] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    const [filterItems, setFilterItems] = useState(filter)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const selectedFilter = filterItems.flatMap(item => item.selected)
    const firstTwoItems = selectedFilter.slice(0, 2)
    const remainingCount = selectedFilter.length - firstTwoItems.length
    
    const filteredData = useCallback(() => {
        return data.filter((lomba) => {
            const matchSearchText = lomba.lombaName.toLowerCase().includes(searchText.toLowerCase());
            const matchStatus = filterItems.find(f => f.filterName === "status")?.selected.includes(lomba.status) 
            || filterItems.find(f => f.filterName === "status")?.selected.length === 0
            const matchGenre = filterItems.find(f => f.filterName === "genre")?.selected.includes(lomba.genre) 
            || filterItems.find(f => f.filterName === "genre")?.selected.length === 0
            const matchMode = filterItems.find(f => f.filterName === "mode")?.selected.includes(lomba.isRegister ? "Register" : "Non Register") 
            || filterItems.find(f => f.filterName === "mode")?.selected.length === 0

            return matchSearchText && matchStatus && matchGenre && matchMode
        })
    }, [data, searchText, filterItems]);


    const paginatedData = useCallback(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData().slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    const dataLength = filteredData().length;
    const totalPages = Math.ceil(filteredData().length / itemsPerPage);

    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));


    function register(isRegister: boolean) {
        if (isRegister){
           return <Badge variant="Finished">Register</Badge> 
        }
        
        return <Badge variant="primary">Non Register</Badge> 
                                        
    }
    

    function genre(genre: string) {

        if(genre === 'Gabungan'){
            return <Badge variant="default">{genre}</Badge>
        } 
        
        if(genre === 'Wanita'){
            return <Badge variant="pink">{genre}</Badge>
        }

        if (genre === 'Pria'){
            return <Badge variant="primary">{genre}</Badge>

        }
       
        return null
                                                                          
    }
    
    function ageSet(isAgeSet: boolean, minAge: number | null, maxAge: number | null) {

        if(isAgeSet){
            return `${minAge} - ${maxAge} Tahun`
        }
        
        return "Semua umur"                                                               
    }

    
    return ( 
        <CardWrapper
            className="space-y-4"
        >
            {/* {JSON.stringify({data})} */}
            <div className="pb-4">
                <h1 className="text-xl font-bold">List Lomba</h1>
                <p className="text-muted-foreground">Ini adalah data semua lomba yg tercatat</p>
            </div>
            {
                data &&
                <>
                    <div
                        className="
                            flex
                            justify-start
                            gap-4
                            w-auto
                        "
                    >
                        <Input
                            onChange={(e) => setSearchText(e.target.value) }
                            type="text"
                            placeholder="Cari nama lomba"
                            className="max-w-40"
                        />
                        
                            <div
                                className="
                                    group
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
                                <PopoverFilterTable
                                    filterItems={filterItems}
                                    setFilterItems={setFilterItems}
                                >
                                    <div className="flex gap-1 items-center">
                                        <CirclePlus className="w-3 h-3"/>
                                        <p className="text-xs">Filter</p>
                                    </div>
                                </PopoverFilterTable>
                                {selectedFilter.length > 0 && <Separator orientation="vertical"/>}
                                <div className="flex gap-1 items-center">
                                    {firstTwoItems.map((item, i) => (
                                        <div
                                            key={i}
                                            className="
                                                bg-muted
                                                p-1 
                                                px-2 
                                                rounded-md 
                                                text-muted-foreground 
                                                group-hover:bg-white
                                            "
                                        >
                                            <p className="text-xs">{item}</p>
                                        </div>
                                    ))}
                                    {remainingCount > 0 && (
                                        <div
                                            className="
                                                bg-muted
                                                p-1 
                                                px-2 
                                                rounded-md 
                                                text-muted-foreground 
                                                group-hover:bg-white
                                            "
                                        >
                                            <p className="text-xs">+{remainingCount}</p>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                    </div>
                    <div className="border rounded-lg">
                    {
                        dataLength > 0 
                        ? (
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
                                    paginatedData().map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Checkbox/>
                                            </TableCell>
                                            <TableCell>
                                                { item.lombaName }
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {  
                                                    item.startAt
                                                    ? (format(item.startAt, 'dd MMMM yyyy')) 
                                                    : "Tanpa tanggal mulai"
                                                }
                                            </TableCell>
                                            <TableCell className="space-y-2">
                                                <div className="flex gap-2 justify-between">
                                                    { register(item.isRegister) }
                                                    { genre(item.genre) }
                                                </div>
                                                <div className="text-center border rounded-lg bg-muted text-muted-foreground">
                                                    { ageSet(item.isAgeSet, item.minAge, item.maxAge)}
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
                          ) 
                        : (
                            <p 
                                className="
                                    py-4
                                    text-center 
                                    italic 
                                    text-muted-foreground
                                "
                            >
                                No results found
                            </p>
                        )
                    }
                    </div>
                    {
                        dataLength > 0  && 
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
                                <span 
                                    className="
                                        mr-10 
                                        font-semibold 
                                        text-md
                                    "
                                >
                                        Halaman {currentPage} of {totalPages}
                                </span>
                                <div
                                    onClick={dataLength > itemsPerPage ? goToFirstPage : undefined}
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
                                    onClick={dataLength > itemsPerPage ? goToPrevPage : undefined}
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
                                    onClick={dataLength > itemsPerPage ? goToNextPage : undefined}
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
                                    onClick={dataLength > itemsPerPage ? goToLastPage : undefined}
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

                    }
                </>  
            }
            {
                data === null && 
                <p 
                    className="
                        py-4
                        text-center 
                        italic 
                        text-muted-foreground
                    "
                >
                    Belum ada lomba
                </p>
            }
        </CardWrapper>
    );
}
