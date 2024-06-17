type CardTitleProps = {
    label: string
}
export const CardTitle = ({label}: CardTitleProps) => {
    return ( 
        <div className="font-semibold px-2 py-1">
            {label}
        </div>
);
}