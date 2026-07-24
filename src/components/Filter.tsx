"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"

const Filter = () => {
    const SearchParams = useSearchParams()
    const selectedCategory = SearchParams.get("category")
    
    const router = useRouter()
    const pathname = usePathname()
    const handleSortClick = (category: string) =>{
        const params = new URLSearchParams()
        params.set("sort", category)
        router.push(`${pathname}?${params.toString()}`,{scroll: false})
    }
    return(
        <div className = "flex items-center gap-2 text-sm my-6 justify-end text-gray-500">
            <span>Sort by:</span>
            <select className = "ring-1 ring-gray-500 shadow-md rounded-sm p-1" onChange = {(e) => handleSortClick(e.target.value)}>
                <option value = "newest">Newest</option>
                <option value = "oldeset">Oldest</option>
                <option value = "price-asc">Price: Low to High</option>
                <option value = "price-desc">Price: High to Low</option>
            </select>
        </div>
    )
}

export default Filter