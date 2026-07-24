import Link from "next/link"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { Bell, Home } from "lucide-react"
import ShopingCartIcon from "./ShopingCartIcon"

const NavBar = () => {
    return(
        <nav className = "flex items-center justify-between pb-4 border-b border-gray-200">
            <Link href = "/" className ="flex items-center gap-2  ">
                <Image src = "/logo.png" alt = "Logo" width = {36} height = {36}  className = "w-6 h-6 md:w-9  md:h-9"/>
                <p className = "hidden md:block font-medium text-md tracking-wider">TRENDLAMA</p>
            </Link>
            <div className = "flex items-center gap-6">
                <SearchBar/>
                <Link href="/">
                    <Home className = "w-4 h-4 text-gray-500"/>
                </Link>
                <Bell className = "w-4 h-4 text-gray-500"/>
                <ShopingCartIcon/>
                <Link href = "/login">sign In</Link>
            </div>
        </nav>
    )
}

export default NavBar;