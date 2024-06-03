type PanitiaLayoutProps ={
    children: React.ReactNode
}

const PanitiaLayout = ({children}:PanitiaLayoutProps) =>{
    return(
        <main>
            {children}
        </main>
    )
}

export default PanitiaLayout