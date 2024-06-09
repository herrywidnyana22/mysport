
'use client'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterpSchema } from "@/lib/formSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2, UserCheck2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getAllUser } from "@/services/users/get";
import { addUser } from "@/services/users/add";

type FormDataRegister = z.infer<typeof RegisterpSchema>

const AddUser = () =>{
    
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
        formState: {errors, isLoading},
        handleSubmit
    } = initForm

    const onSubmit = async(formData: FormDataRegister) =>{
        try {
            const createUser = await addUser(formData)

            if (createUser.status === "success") {
                toast.success(createUser.msg)
                reset()
            }
            if (createUser.status === "error") {
                toast.success(createUser.msg)
                reset()
            }

        } catch (error) {
            toast.error(error as string)
        } 
    }


    return(
        <div>  
            
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                            disabled={isLoading || Object.keys(errors).length > 0}
                        >
                            {
                                isLoading 
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