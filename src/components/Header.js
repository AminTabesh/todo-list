function Header() {
    return (
        <div className="flex gap-2 justify-center items-center mt-2">
            <img src="/logo.png"  alt="Directam Logo" className="w-10 rounded-full border-2 border-logo-primary"/>
            <p className="font-medium text-xl">Directam <span className="text-logo-primary-dark">Todo</span> List</p>
        </div>
    )
} 

export default Header
