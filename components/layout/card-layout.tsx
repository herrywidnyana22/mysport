import { Card } from "@/components/ui/card"

export const CardLayout = () =>{
    return(
        <div 
            className="
                w-full
                flex 
                gap-4
                justify-between 
            "
        >

            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    )
}