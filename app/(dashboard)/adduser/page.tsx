
'use client'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterpSchema } from "@/lib/formSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useHookMutation } from "@/hooks/useHookMutation";
import { toast } from "sonner";

type FormDataRegister = z.infer<typeof RegisterpSchema>

const AddUser = () =>{
    const [isPending, setIsPending] = useState(false)

    const initForm = useForm<FormDataRegister>({
        resolver: zodResolver(RegisterpSchema),
        mode:"onChange",
        defaultValues: {
            name:"",
            username:"",
            email: "",
            password: ""
        }
    })

    const {
        control,
        reset,
        formState: {errors},
        handleSubmit
    } = initForm



    const onSubmit = async(formData: FormDataRegister) =>{
        
    }

    return(
        <div>
            <div>
                {
                    
                }

            </div>
            <div className="w-80 m-auto">
                <Form {...initForm}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div
                            className="
                                space-y-4
                            "
                        >
                            <FormField
                                control={control}
                                name="name"
                                disabled={isPending}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="John Cena"
                                                className={errors.name && "border-rose-500"}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="username"
                                disabled={isPending}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="John Cena"
                                                className={errors.username && "border-rose-500"}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="email"
                                disabled={isPending}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="email@example.com"
                                                className={errors.email && "border-rose-500"}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="password"
                                disabled={isPending}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="********"
                                                className={errors.password && "border-rose-500"}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending || Object.keys(errors).length > 0}
                        >
                            {
                                isPending 
                                ? <Loader2 className="w-5 h-5 animate-spin"/>
                                : "Create an account"
                            }
                            
                            
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddUser