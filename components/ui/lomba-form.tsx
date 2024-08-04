'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { InputText } from "@/components/ui/input-text";
import { LombaSchema, jenisKelaminOption, GenerateDynamicSchemaByPos, VALIDATE_MESSAGES, PosOption } from "@/lib/formSchema";
import { z } from 'zod'
import { useState } from "react";
import { toast } from "sonner";
import { ButtonAction } from "./button-action";
import { RadioGroup } from "./radio-group";
import { Switch } from "./switch";
import { cn } from "@/lib/utils";
import { isBigger } from "@/utils/isBigger";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "./datepicker";
import { OptionToggle } from "./option-toggle";
import { SwitchForm } from "./switch-form";
import { CardWrapper } from "./card-wrapper";
import { Hint } from "./hint";
import { addLomba } from "@/services/lomba/add";


export type FormDataLomba = z.infer<ReturnType<typeof GenerateDynamicSchemaByPos>>

const DEFAULT_JUMLAH_POS = 1

export const LombaForm = () => {
    const [jumlahPos, setJumlahPos] = useState(DEFAULT_JUMLAH_POS)


    const formSchema = GenerateDynamicSchemaByPos(jumlahPos)  
        
    const initForm = useForm<FormDataLomba>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            lombaName: "",
            startAt: undefined,
            isStartSet: true,
            isRegister: false,
            isAgeSet: false,
            minAge: 2,
            maxAge: 3,
            jenisKelamin: "Gabungan",
            jumlahPos: 1,
            pos: Array.from({ length: jumlahPos }, (_, index) => ({ name: `pos.${index}`, value: '' })),
            isFinish: `pos.${jumlahPos-1}`
        },
    })

    const {
        handleSubmit,
        control,
        reset,
        getValues,
        setValue,
        resetField,
        formState: { errors },
    } = initForm


    const [isPending, setIsPending] = useState(false)
    const [posOption, setPosOption] = useState(
        PosOption(jumlahPos).options
    )
    
    
    const [isUsiaOption, setIsUsiaOption] = useState(getValues('isAgeSet'))
    const [isStartDate, setIsStartDate] = useState(getValues('isStartSet'))
    const [minAgeInput, setMinAgeInput] = useState(2)
    const [maxAgeInput, setMaxAgeInput] = useState(3)

    // )

    const setDefault = () =>{
        reset()
        setJumlahPos(DEFAULT_JUMLAH_POS)
    }

    const onSubmit = async(data: FormDataLomba) =>{
        setIsPending(true)
        console.log({data})

        try {
            const addAction = await addLomba(data)
            if(addAction.status === 'error') {
                return toast.error(addAction.msg)
            }
            setDefault()
            return toast.success(addAction.msg)
        } catch (error) {
            toast.error(error as string)
        } finally{
            setIsPending(false)
        }
    }
    
    

    const onUsiaToggle = (value: boolean, onChange: any) => {
        setIsUsiaOption(value)
        onChange(value)
        if (!value) {
            setValue("minAge", 2)
            setValue("maxAge", 3)
            setMinAgeInput(2)
            setMaxAgeInput(3)
        }
    }

    const onUsiaValueChange = (field: any, onChange: any) => {
        const {value, name } = field
        const numericValue = value.replace(/^0+/, '')
        const numberValue = Number(numericValue)
        
        onChange(numberValue)
        
        
        if(name === "minAge"){
            const minAge = Number(value)
            setMinAgeInput(minAge)
        }
        if(name === "maxAge"){
            const maxAge = Number(value)
            setMaxAgeInput(maxAge)
        }        
    }

    const onIsDateToggle = (value: boolean, onChange: any) => {
        if(!value){
            resetField('startAt')
        }
        setIsStartDate(value)
        onChange(value)
    }

    const onJumlahPosChange = (field: HTMLInputElement, onChange: any) => {
        const {value } = field
        const numericValue = value.replace(/^0+/, '')
        const numberValue = Number(numericValue)
        resetField('pos')

        const opsiPos = PosOption(numberValue).options 
        setValue('isFinish', opsiPos[numberValue-1])
        setValue('pos', Array.from({ length: numberValue }, (_, index) => ({ 
            name: `pos.${index}`, 
            value: '' 
        })))
        
        onChange(numberValue)
        setJumlahPos(numberValue)
        setPosOption(opsiPos)
    }

    const onIsPosFinishToggle = (checked:boolean, onChange: any, pos: string) =>{
        const newValue = checked 
        ? pos 
        : ''

        setValue('isFinish', newValue)
        onChange(newValue)
    }

    
    return ( 
        <Form {...initForm}>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="relative mt-2"
                
            >
                <ScrollArea className="h-96 pb-16">
                    <div 
                        className="
                            mt-2 
                            space-y-4
                        " 
                    >
                        <FormField
                            control={control}
                            name="lombaName"
                            render={({field}) =>(
                                <FormItem>
                                    <FormControl>
                                        <InputText
                                            {...field}
                                            type="text"
                                            placeholder="Masukkan nama lomba"
                                            label="Nama Lomba"
                                            disabled={isPending}
                                            errorMsg={errors.lombaName?.message}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="jenisKelamin"
                            render={({field}) =>(
                                <FormItem>
                                    <div
                                        className="
                                            flex
                                            justify-between
                                            items-center
                                        "
                                    >
                                        <FormLabel>Kelompok Peserta</FormLabel>
                                        <FormControl>
                                            <OptionToggle
                                                initValue={field.value}
                                                onChange={field.onChange}
                                                data={jenisKelaminOption}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="text-right"/>
                                </FormItem>
                            )}
                        />
                        <div
                            className="
                                relative
                                flex
                                gap-2
                                justify-between
                            "
                        >
                            <FormField
                                control={control}
                                name="isAgeSet"
                                render={({ field }) => (
                                    <SwitchForm
                                        label="Batas Usia"
                                        desc={`Batas usia peserta lomba, 
                                            posisi "OFF" untuk semua usia`
                                        }
                                        checked={field.value}   
                                        onChange={(value) => 
                                            onUsiaToggle(value, field.onChange)
                                        }
                                        isError={!!errors.isAgeSet}
                                        className={field.value ? "w-[82%]" : ""}                            
                                    />
                                )}
                            />
                            {
                                isUsiaOption && (
                                    <div
                                        className={cn(`
                                            flex
                                            flex-col
                                            gap-2
                                            transition
                                            duration-1000`,
                                        )}
                                    >
                                        <FormField
                                            control={control}
                                            name="minAge"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <InputText 
                                                            {...field} 
                                                            type="number"
                                                            value={field.value.toString()}
                                                            onChange={(e) => 
                                                                onUsiaValueChange(e.target, field.onChange)
                                                            }
                                                            placeholder=""
                                                            label={"Min"} 
                                                            disabled={isPending} 
                                                            errorMsg={errors.minAge?.message}
                                                            className="max-w-14"  
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name="maxAge"
                                            render={({ field }) => (
                                                <FormItem 
                                                    className="
                                                        flex 
                                                        flex-col 
                                                        gap-0
                                                    "
                                                >
                                                    <FormControl>
                                                        <InputText 
                                                            {...field} 
                                                            type="number"
                                                            value={field.value.toString()}
                                                            onChange={(e) => 
                                                                onUsiaValueChange(e.target, field.onChange)
                                                            }
                                                            placeholder=""
                                                            label={"Max"} 
                                                            disabled={isPending} 
                                                            errorMsg={
                                                                !isBigger(maxAgeInput, minAgeInput) 
                                                                && VALIDATE_MESSAGES.IS_SMALLER
                                                            }
                                                            className="max-w-14" 
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="p-0 m-0"/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        
                        <CardWrapper 
                            isError={!!errors.startAt}
                            className="shadow-none"
                        >
                            <FormField
                                control={control}
                                name="isStartSet"
                                render={({ field }) => (
                                    <SwitchForm
                                        label="Tanggal Mulai"
                                        desc={`Atur tanggal mulai, "OFF" untuk lomba random`}
                                        withborder={false}
                                        checked={field.value} 
                                        onChange={(value) => 
                                            onIsDateToggle(value, field.onChange)
                                        }
                                    />
                                )}
                            />
                            {
                                isStartDate && 
                                (
                                    <FormField
                                        control={control}
                                        name="startAt"
                                        render={({ field }) => (
                                            <FormItem 
                                                className="
                                                    flex 
                                                    flex-col
                                                "
                                            >
                                                <DatePicker
                                                    date={field.value}
                                                    setDate={field.onChange}
                                                    placeholder="Pilih tanggal mulai"
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                        </CardWrapper>
                        <FormField
                            control={control}
                            name="isRegister"
                            render={({ field }) => (
                                <SwitchForm
                                    label="Mode Register"
                                    desc={`Atur untuk peserta apakah perlu melakukan registrasi`}
                                    checked={field.value}   
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        
                        
                        <CardWrapper
                            isError={!!errors.pos || !!errors.jumlahPos}
                            className="
                                shadow-none 
                                space-y-2
                            "
                        >
                            <div 
                                className="
                                    flex 
                                    justify-between
                                "
                            >
                                <div>
                                    <FormLabel>
                                        Pos
                                    </FormLabel>
                                    <FormDescription>
                                        Atur banyaknya titik pos lomba
                                    </FormDescription>
                                </div>
                                <FormField
                                    control={control}
                                    name="jumlahPos"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputText 
                                                    {...field} 
                                                    type="number"
                                                    value={field.value.toString()}
                                                    onChange={(e) => 
                                                        onJumlahPosChange(e.target, field.onChange)
                                                    }
                                                    placeholder="Masukkan jumlah Pos lomba"
                                                    label={"Jumlah Pos"} 
                                                    disabled={isPending} 
                                                    errorMsg={errors.jumlahPos?.message}
                                                    className="max-w-24"  
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <ScrollArea className="h-[105px]">
                                <FormField
                                    control={control}
                                    name="isFinish"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="
                                                        grid
                                                        grid-cols-2
                                                        items-center
                                                        gap-x-3
                                                        pt-2
                                                    "
                                                >
                                                {
                                                    !errors.jumlahPos 
                                                    && (
                                                        posOption.map((pos, index) => (
                                                        <div 
                                                            key={index}
                                                            className="
                                                                relative
                                                                flex
                                                                gap-1
                                                                items-center
                                                            "
                                                        >
                                                            <Hint
                                                                label="Atur sebagai pos finish"
                                                                side="top"
                                                            >
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Switch
                                                                            checked={pos === field.value}
                                                                            onCheckedChange={(isChecked) => 
                                                                                onIsPosFinishToggle(isChecked, field.onChange, pos)
                                                                            }
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            </Hint>
                                                            <FormField
                                                                name={`pos.${index}.name`}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <input
                                                                                {...field} 
                                                                                type="hidden" 
                                                                                value={pos} 
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>

                                                                )}
                                                            />
                                                            <FormField
                                                                control={control}
                                                                name={`pos.${index}.value`} 
                                                                render={({ field }) => (
                                                                    <FormItem className="flex gap-0 flex-col justify-start items-start">
                                                                        <FormControl>
                                                                            <InputText
                                                                                {...field}
                                                                                value={field.value}
                                                                                type="text"
                                                                                placeholder={
                                                                                    getValues('isFinish') === `pos.${index}`
                                                                                    ? 'Nama Pos Finish'
                                                                                    : `Nama pos ${index + 1}`
                                                                                    
                                                                                }
                                                                                label={
                                                                                    getValues('isFinish') === `pos.${index}`
                                                                                    ? 'Pos Finish'
                                                                                    : `Pos ${index + 1}`
                                                                                }
                                                                                onChange={field.onChange}
                                                                                errorMsg={errors.pos && errors.pos[index] && errors.pos[index]!.value?.message }
                                                                            />
                                                                        </FormControl>
                                                                        {/* {JSON.stringify({field})}
                                                                        {JSON.stringify({errorsPos: errors.pos})} */}
                                                                    </FormItem>
                                                                )}
                                                            /> 
                                                        </div>
                                                        
                                                    )))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </ScrollArea>    
                        </CardWrapper>
                        
                        <ButtonAction 
                            type="submit" 
                            variant="text"
                            mode="primary"
                            disabled={
                                isPending 
                                || Object.keys(errors).length > 0 
                                || !isBigger(maxAgeInput, minAgeInput)
                            }
                            isPending={isPending}
                            label={"Simpan"}
                            className="absolute bottom-2"
                        />

                    </div>
                </ScrollArea>
                
            </form>
        </Form>
    );
}