type AdminLayoutProps ={
    children: React.ReactNode
}

const AdminLayout = ({children}:AdminLayoutProps) =>{
    return(
        <main>
            {children}
        </main>
    )
}

export default AdminLayout