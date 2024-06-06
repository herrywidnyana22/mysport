import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface InputTextProps {
    id?: string;
    name?: string;
    value?: any;
    disabled?: boolean;
    placeholder?: string;
    type?: "text" | "password" | "number" | "hidden" | "radio" | "checkbox" | "email";
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
                        bg-white
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        focus:text-sm`,
                        className,
                        disabled && "opacity-80 cursor-not-allowed",
                        readOnly 
                        ? "ring-0 shadow-none border-transparent bg-transparent"
                        : "shadow-sm",
                        errorMsg && "border-rose-400  ring-rose-300"
                        
                    )}
                />
                {/* {   !readOnly &&( */}
                    <label className={cn(`
                        absolute
                        top-2.5
                        left-2.5
                        px-1
                        text-sm
                        origin-[0]
                        z-10
                        duration-150
                        transform`,
                        !readOnly 
                        && `
                            -translate-y-5
                            bg-white
                            pointer-events-none
                            peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75
                            peer-focus:-translate-y-5
                        `, errorMsg && "text-rose-400",
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