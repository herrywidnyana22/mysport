type TextActionProps = {
    label: string
    onClick: () => void
}

export const TextAction = ({label, onClick}: TextActionProps) => {
    return ( 
        <span
            onClick={onClick} 
            className="
                text-sm 
                text-muted-foreground 
                mt-5
                cursor-pointer
            "
        >
            { label }
        </span>
    )
}