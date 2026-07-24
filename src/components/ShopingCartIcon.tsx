"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/dist/client/link"

const ShopingCartIcon = () => {
    return(
        <Link href = "/cart" className= "relative">
            <ShoppingCart className = "w-4 h-4 text-gray-500"/>
            <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 flex items-center justify-center w-4 h-4 rounded-full text-xs font-medium">0</span>
        </Link>
    )
}

export default ShopingCartIcon