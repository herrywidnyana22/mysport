import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface InputTextProps {
    id?: string;
    name?: string;
    value?: any;
    disabled?: boolean;
    placeholder: string;
    type?: "text" | "password" | "number" | "hidden" | "radio" | "checkbox" | "email" | "date"
    label?: string;
    readOnly?: boolean;
    className?: string;
    errorMsg?: any;
    onChange?: (value: any) => void | void
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(({
    id,
    name,
    value,
    type,
    label,
    placeholder,
    disabled,
    readOnly,
    onChange,
    className, 
    errorMsg,
}, ref) => {
    return ( 
        <div
            className="
                relative
                flex
                flex-col
            "
        >
            <div
                className="
                    relative
                    w-fulll
                    text-neutral-700
                "
            >
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={placeholder ? placeholder : "  "}
                    onChange={onChange}
                    className={cn(`
                        appearance-none
                        no-spinner
                        w-full
                        peer
                        p-2
                        text-sm
                        px-3
                        pt-2
                        font-light
                        rounded-md
                        border-2
                        outline-none
                        transition
                        placeholder-opacity-0
                        bg-white
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        focus:placeholder-opacity-100
                        focus:text-sm
                        focus:border-indigo-500`,
                        className,
                        disabled && "opacity-80 cursor-not-allowed",
                        readOnly && "ring-0 shadow-none border-transparent bg-transparent",
                        errorMsg && "border-rose-400  ring-rose-300"
                        
                    )}
                />
                    <label className={cn(`
                        absolute
                        top-3
                        left-2.5
                        px-1
                        text-xs
                        origin-[0]
                        duration-150`,
                        !readOnly && `
                            -translate-y-5
                            w-auto
                            bg-white
                            pointer-events-none
                            peer-placeholder-shown:scale-0
                            peer-placeholder-shown:translate-y-0
                            peer-focus:font-semibold
                            peer-focus:scale-90
                            peer-focus:text-indigo-500
                            peer-focus:-translate-y-5`,
                            errorMsg && "text-rose-400",
                        className  
                    )}>
                        { label }
                    </label>
            </div>
            <div className="flex flex-col mt-1">
                <span className="text-xs text-rose-400">
                {  errorMsg }
                </span>

            </div>
        </div>

    );
})

InputText.displayName = "InputText"