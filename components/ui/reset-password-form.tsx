// components/ResetPasswordForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input-text";
import { Loader2 } from "lucide-react";
import { ResetPasswordSchema } from "@/lib/formSchema";
import { z } from "zod";
import { useState } from "react";

type FormResetPassword = z.infer<typeof ResetPasswordSchema>;


export const ResetPasswordForm = () => {
    const [isPending, setIsPending] = useState(false)
    const initForm = useForm<FormResetPassword>({
        resolver: zodResolver(ResetPasswordSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = initForm

    const onSubmit = () =>{

    }


    return (
        <Form {...initForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center px-10 ">
                <h1 className="font-bold text-2xl">Forget Password</h1>
                <div className="space-y-4 mt-8 mb-2 w-full">
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputText {...field} 
                                        type="email" 
                                        label={"Email"}
                                        placeholder={"Masukkan email yg digunakan"}
                                        disabled={isPending} 
                                        errorMsg={errors.email?.message} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isPending || Object.keys(errors).length > 0} className="w-full mt-3 px-12 py-3 uppercase font-semibold border border-solid border-transparent text-sm text-white">
                    {
                        isPending 
                        ? <Loader2 className="w-5 h-5 animate-spin" /> 
                        : "Send Verification"
                    }
                </Button>
            </form>
        </Form>
    )
}
