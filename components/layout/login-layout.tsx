'use client'

import { useState } from "react"
import { cn } from "@/lib/utils";
import { ResetPasswordForm } from "../ui/reset-password-form";
import { LoginForm } from "../ui/login-form";
import { TextAction } from "../ui/text-action";
import { TogglePanel } from "../ui/toggle-panel-login";

export const LoginLayout = () => {
    const [isToggle, setIsToggle] = useState(false)

    const onToggle = () =>{
        setIsToggle(!isToggle)
    }

    return (
        <div
            style={{
                background: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
                backgroundColor: "#c9d6ff",
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
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)",
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
                        isToggle
                        ? "translate-x-full opacity-100 z-50 animate-move duration-700"
                        : "opacity-0"
                    )}
                >
                    <div
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
                        <ResetPasswordForm/>
                        <TextAction 
                            label="Kembali untuk login" 
                            onClick={onToggle}
                        />
                    </div>
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
                        isToggle && "-translate-x-full"
                    )}
                >
                    <div
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
                        <LoginForm/>
                        <TextAction 
                            label="Lupa password?" 
                            onClick={() => setIsToggle(!isToggle)}
                        />
                    </div>
                </div>

                <div
                    style={{
                        borderRadius: 
                        isToggle 
                        ? "0 150px 100px 0" 
                        : "150px 0 0 100px",
                    }}
                    className={cn(`
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
                        isToggle && "-translate-x-full"
                    )}
                >
                    <div
                        style={{
                            backgroundColor: "#512da8",
                            background: "linear-gradient(to right, #5c6bc0, #512da8)",
                        }}
                        className={cn(`
                            relative
                            w-[200%]
                            h-full
                            -left-full
                            transition-all 
                            duration-700 
                            ease-in-out
                            text-white`,
                            isToggle 
                            ? "translate-x-1/2" 
                            : "translate-x-0"
                        )}
                    >
                        <TogglePanel
                            title="Lupa password?"
                            content="Masukan email yg kamu gunakan untuk mereset"
                            className={
                                isToggle 
                                ? "translate-x-0" 
                                : "-translate-x-[200%]"
                            }
                        />
                        <TogglePanel
                            title="Selamat datang kembali!"
                            content="Masuk dengan username dan password Anda"
                            className={cn(`
                                right-0`,
                                isToggle 
                                ? "translate-x-[200%]" 
                                : "translate-x-0")
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
