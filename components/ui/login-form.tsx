'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input-text";
import { Loader2 } from "lucide-react";
import { LoginSchema } from "@/lib/formSchema";
import { z } from "zod";
import { useState } from "react";
import { login } from "@/services/auth/login";
import { toast } from "sonner";

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

            return toast.success("Login sukses...")
        } catch (error) {
            toast.error(error as string)
        } finally{
            setIsPending(false)
        }
    }

    return (
        <Form {...initForm }>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center px-10 ">
                <h1 className="font-bold text-2xl">Sign in</h1>
                <div className="space-y-4 mt-8 mb-2 w-full">
                    <FormField
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputText {...field} type="text" label={"Username"} disabled={isPending} errorMsg={errors.username?.message} />
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
                                    <InputText {...field} type="password" label="Password" disabled={isPending} errorMsg={errors.password?.message} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isPending || Object.keys(errors).length > 0} className="w-full mt-3 px-12 py-3 uppercase font-semibold border border-solid border-transparent text-sm text-white">
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
                </Button>
            </form>
        </Form>
    )
}
