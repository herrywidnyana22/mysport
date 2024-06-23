import { InputText } from "@/components/ui/input-text";
import { CardWrapper } from "../ui/card-wrapper";
import { CardTitle } from "../ui/card-title";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
 
}

const DEFAULT_NUM_INPUT = 4

export const InputGroupLayout = ({}: Props) => {
    
    return ( 
        <CardWrapper>
            <CardTitle label="Masukkan No Peserta"/>
            <form action="">
                <div 
                    className="
                        flex 
                        justify-between 
                        gap-2
                        mt-4
                        mb-2
                    "
                >
                {
                    Array.from({length: DEFAULT_NUM_INPUT}).map((_, i) => (
                        <InputText
                            key={i}
                            placeholder="Masukan no peserta"
                            label={`No Peserta ${i+1}`}
                        />
                    ))
                }
                </div>
                <Button
                    type="submit" 
                    size={"sm"} 
                    variant={"primary"}
                    className="w-full" 
                >
                    Simpan
                    <Loader2 
                        className="
                            w-4 
                            h-4 
                            animate-spin
                        "
                    />
                </Button>

            </form>
        </CardWrapper>
    );
}