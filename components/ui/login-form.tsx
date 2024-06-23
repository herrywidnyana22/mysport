'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input-text";
import { Loader2 } from "lucide-react";
import { LoginSchema } from "@/lib/formSchema";
import { z } from "zod";
import { useState } from "react";
import { login } from "@/services/auth/login";
import { toast } from "sonner";
import { ButtonAction } from "./button-action";

type FormDataLogin = z.infer<typeof LoginSchema>;


export const LoginForm = () => {
    const [isPending, setIsPending] = useState(false)

    const initForm = useForm<FormDataLogin>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = initForm

     const onSubmit = async(values: z.infer<typeof LoginSchema>) =>{
        setIsPending(true)
        try {
            const loginAction = await login(values)
            if(loginAction?.error) {
                return toast.error(loginAction.error)
            }
            reset()
            return toast.success("Login sukses...")
        } catch (error) {
            toast.error(error as string)
        } finally{
            setIsPending(false)
        }
    }

    return (
        <Form {...initForm }>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    px-10 
                "
            >
                <h1 
                    className="
                        font-bold 
                        text-2xl
                    "
                >
                    Sign in
                </h1>
                <div 
                    className="
                        w-full
                        space-y-4 
                        mt-8 
                        mb-2 
                    "
                >
                    <FormField
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputText 
                                        {...field} 
                                        type="text"
                                        placeholder="Masukkan username"
                                        label={"Username"} 
                                        disabled={isPending} 
                                        errorMsg={errors.username?.message} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputText 
                                    {...field} 
                                    type="password" 
                                    label="Password"
                                    placeholder="Masukkan password" 
                                    disabled={isPending} 
                                    errorMsg={errors.password?.message} 
                                />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <ButtonAction 
                    type="submit" 
                    variant="text"
                    disabled={isPending || Object.keys(errors).length > 0}
                    isPending={isPending}
                    label={"Login"} 
                />
            </form>
        </Form>
    )
}
