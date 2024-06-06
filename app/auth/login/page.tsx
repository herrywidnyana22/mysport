'use client'

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema, ResetPasswordSchema } from "@/lib/formSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InputText } from "@/components/ui/input-text";
import { cn } from "@/lib/utils";


type FormDataLogin = z.infer<typeof LoginSchema>
type FormResetPassowrd = z.infer<typeof ResetPasswordSchema>

const LoginPage = () => {
    const [isPending, setIsPending] = useState(false)
    const [isToogle, setisToogle] = useState(false)


    const initForm = useForm<FormDataLogin>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
        defaultValues:{
            username: "",
            password: ""
        }
    })

    const initFormResetPassword = useForm<FormResetPassowrd>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
        defaultValues:{
            email: "",
        }
    })

    const router = useRouter()

    const {
        handleSubmit: handleSubmitLogin,
        control: controlLogin,
        reset: resetLogin,
        formState: { errors: errorsLogin },
    } = initForm;

    // Destructure properties from initFormResetPassword
    const {
        handleSubmit: handleSubmitResetPassword,
        control: controlResetPassword,
        reset: resetResetPassword,
        formState: { errors: errorsResetPassword },
    } = initFormResetPassword;

    const onSubmit = async (data: any) => {
        console.log({data})
    }

    return (
        <div
            style={{
                background: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
                backgroundColor: "#c9d6ff"
            }}
            className="
                h-screen
                flex
                flex-col
                items-center
                justify-center
            "
        >
            <div
                style={{
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)"
                }}
                className="
                    relative
                    w-[768px]
                    max-w-full
                    min-h-[480px]
                    overflow-hidden
                    rounded-[30px]
                    bg-white
                "
            >
                <div
                    className={cn(`
                        form-container 
                        sign-up
                        absolute
                        w-1/2
                        h-full
                        top-0
                        left-0
                        transition-all 
                        duration-700 
                        ease-in-out
                        z-20`,
                        isToogle 
                        ? "translate-x-full opacity-100 z-50 animate-move duration-700"
                        : "opacity-0"
                    )}
                >
                    <Form {...initFormResetPassword}>
                        <form
                            onSubmit={initFormResetPassword.handleSubmit(onSubmit)}
                            className="
                                h-full
                                flex
                                flex-col
                                items-center
                                justify-center
                                px-10
                                bg-white
                            "
                        >
                            <h1 
                                className="
                                    font-bold 
                                    text-2xl
                                "
                            >
                                Forget Password
                            </h1>
                            <div
                                className="
                                    space-y-4
                                    mt-8
                                    mb-2
                                    w-full
                                "
                            >
                                <FormField
                                    control={controlResetPassword}
                                    name="email"
                                    disabled={isPending}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputText
                                                    {...field}
                                                    type="email"
                                                    label={"Email"}
                                                    disabled={isPending}
                                                    errorMsg={errorsResetPassword.email?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div> 
                            <Button
                                type="submit"
                                disabled={isPending || Object.keys(errorsResetPassword).length > 0}
                                className="
                                    w-full
                                    mt-3
                                    px-12
                                    py-3
                                    uppercase
                                    font-semibold
                                    border 
                                    border-solid 
                                    border-transparent
                                    text-sm
                                    text-white
                                "
                            >
                                {
                                    isPending 
                                    ? <Loader2 className="w-5 h-5 animate-spin"/>
                                    : "Send Verification"
                                }
                                
                                
                            </Button>
                            <span
                                onClick={() => setisToogle(!isToogle)} 
                                className="
                                    text-sm 
                                    text-muted-foreground 
                                    mt-5
                                    cursor-pointer
                                "
                            >
                                Kembali untuk login
                            </span>
                        </form>
                    </Form>
                </div>
                <div
                    className={cn(`
                        form-container 
                        sign-in
                        absolute
                        w-1/2
                        h-full
                        top-0
                        left-0
                        transition-all 
                        duration-700 
                        ease-in-out
                        z-20`,
                        isToogle && "-translate-x-full"                        
                    )}
                >
                    <Form {...initForm}>
                        <form
                            onSubmit={handleSubmitLogin(onSubmit)}
                            className="
                                h-full
                                flex
                                flex-col
                                items-center
                                justify-center
                                px-10
                                bg-white
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
                                    space-y-4
                                    mt-8
                                    mb-2
                                    w-full
                                "
                            >
                                <FormField
                                    control={controlLogin}
                                    name="username"
                                    disabled={isPending}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputText
                                                    {...field}
                                                    type="text"
                                                    label={"Username"}
                                                    disabled={isPending}
                                                    errorMsg={errorsLogin.username?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={controlLogin}
                                    name="password"
                                    disabled={isPending}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputText
                                                    {...field}
                                                    type="password"
                                                    label="Password"
                                                    disabled={isPending}
                                                    errorMsg={errorsLogin.password?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div> 
                            <Button
                                type="submit"
                                disabled={isPending || Object.keys(errorsLogin).length > 0}
                                className="
                                    w-full
                                    mt-3
                                    px-12
                                    py-3
                                    uppercase
                                    font-semibold
                                    border 
                                    border-solid 
                                    border-transparent
                                    text-sm
                                    text-white
                                "
                            >
                                {
                                    isPending 
                                    ? <Loader2 className="w-5 h-5 animate-spin"/>
                                    : "Login"
                                }
                                
                                
                            </Button>
                            <span
                                onClick={() => setisToogle(!isToogle)} 
                                className="
                                    text-sm 
                                    text-muted-foreground 
                                    mt-5
                                    cursor-pointer
                                "
                            >
                                Lupa password?
                            </span>
                        </form>
                    </Form>
                </div>
                
                <div
                style={{
                    borderRadius: 
                    isToogle 
                    ? "0 150px 100px 0"
                    : "150px 0 0 100px"
                }}
                    className={cn(`
                        toogle-container
                        absolute
                        w-1/2
                        h-full
                        top-0
                        left-1/2
                        overflow-hidden
                        transition-all 
                        duration-700 
                        ease-in-out
                        z-30`,
                        isToogle && "-translate-x-full"
                    )}
                >
                    <div
                        style={{
                            backgroundColor:"#512da8",
                            background:"linear-gradient(to right, #5c6bc0, #512da8)",
                        }}
                        className={cn(`
                            toggle
                            relative
                            w-[200%]
                            h-full
                            -left-full
                            transition-all 
                            duration-700 
                            ease-in-out
                            text-white`,
                            isToogle
                            ? "translate-x-1/2"
                            : "translate-x-0"
                        )}
                    >
                        <div
                            className={cn(`
                                toggle-panel
                                toogle-left
                                absolute
                                w-1/2
                                h-full
                                flex
                                flex-col
                                items-center
                                justify-center
                                top-0
                                px-8
                                text-center
                                transition-all
                                duration-700
                                ease-in-out`,
                                isToogle
                                ? "translate-x-0"
                                : "-translate-x-[200%]"
                                
                            )}
                        >
                            <h1 
                                className="
                                    font-bold 
                                    text-2xl
                                "
                            >
                                Lupa password?
                            </h1>
                            <p
                                className="
                                    text-sm
                                    leading-5
                                    tracking-wide
                                    my-5
                                "
                            >
                                Masukan email yg kamu gunakan untuk mereset dan mengganti password
                            </p>
                        </div>
                        <div
                            className={cn(`
                                toggle-panel
                                toogle-right
                                absolute
                                w-1/2
                                h-full
                                flex
                                flex-col
                                items-center
                                justify-center
                                top-0
                                right-0
                                px-8
                                text-center
                                transition-all
                                duration-700
                                ease-in-out`,
                                isToogle
                                ? "translate-x-[200%]"
                                : "translate-x-0"
                                
                            )}
                        >
                            <h1 className="font-bold text-2xl">Hello, Friend</h1>
                            <p
                                className="
                                    text-sm
                                    leading-5
                                    tracking-wide
                                    my-5
                                "
                            >
                                Enter your personal detail to use all of site features
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoginPage