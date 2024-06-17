import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const MenuLayout = () =>{
    return(
        <Tabs defaultValue="overview">
            <TabsList className="flex gap-2 justify-start">
                <TabsTrigger value="overview" className="font-semibold">Overview</TabsTrigger>
                <TabsTrigger value="user" className="font-semibold">User</TabsTrigger>
                <TabsTrigger value="category" className="font-semibold">Kategori</TabsTrigger>
                <TabsTrigger value="pos" className="font-semibold">Pos</TabsTrigger>
                <TabsTrigger value="peserta" className="font-semibold">Peserta</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}