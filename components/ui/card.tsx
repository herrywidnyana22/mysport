import { RussianRuble } from "lucide-react"
import { CardWrapper } from "./card-wrapper"

type Props = {
    
}
 
    
export const Card = ({}: Props) => {
    return ( 
        <CardWrapper className="mb-4">
            <div
                className="
                    flex
                    justify-between
                    items-center
                    text-
                    font-medium
                    text-neutral-800
                    tracking-wide
                    mb-1
                "
            >
                <p>Card title</p>
                <RussianRuble/>
            </div>
            <div
                className="
                    text-lg
                    font-bold
                "
            >
                Card Content
            </div>
            <div
                className="
                    text-xs
                    text-muted-foreground
                "
            >
                Card footer
            </div>
        </CardWrapper>
    )
}