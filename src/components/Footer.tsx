import Link from "next/link"
import Image from "next/image"


const Footer = () => {
    return(
        <div className = "mt-16 flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-center md:items-start bg-gray-800 p-8 rounded-lg">
            <div className = "flex flex-col items-center md:items-start gap-4">
                <Link href = "/" className ="flex items-center gap-2  ">
                    <Image src = "/logo.png" alt = "Logo" width = {36} height = {36}  className = "w-6 h-6 md:w-9  md:h-9"/>
                    <p className = "hidden md:block font-medium text-md tracking-wider text-white">TRENDLAMA</p>
                </Link>
                <p className = "text-gray-400 text-sm mt-4 md:mt-0">© 2023 TRENDLAMA.</p>
                <p className = "text-gray-400 text-sm mt-4 md:mt-0">All rights reserved.</p>
            </div>
            
            <div className = "flex flex-col text-sm text-gray-400 items-center md:items-start gap-4">
                <p className = "text-amber-100 text-sm">Links</p>
                <Link href="/">Home</Link>
                <Link href="/">Contact</Link>
                <Link href="/">About</Link>
                <Link href="/">Terms of Service</Link>
            </div>
            <div className = "flex flex-col text-sm text-gray-400 items-center md:items-start gap-4">
                <p className = "text-amber-100 text-sm">Products</p>
                <Link href="/">All Products</Link>
                <Link href="/">New Arrivals</Link>
                <Link href="/">Best Sellers</Link>
                <Link href="/">Trending</Link>
            </div>
            <div className = "flex flex-col text-sm text-gray-400 items-center md:items-start gap-4">
                <p className = "text-amber-100 text-sm">Company</p>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Blog</Link>
                <Link href="/">Team</Link>
            </div>
        </div>
    )
}

export default Footer;