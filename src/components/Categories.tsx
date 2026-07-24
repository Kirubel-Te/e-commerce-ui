"use client" 
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { ShoppingBasket, Shirt, Footprints, Glasses, Briefcase, Venus, Hand } from "lucide-react"

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves",
  },
];


const Categories = () => {

    const SearchParams = useSearchParams()
    const selectedCategory = SearchParams.get("category")

    const router = useRouter()
    const pathname = usePathname()

    const handleCategoryClick = (category: string|null) =>{
        const params = new URLSearchParams()
        params.set("category", category || "all")
        router.push(`${pathname}?${params.toString()}`,{scroll: false})
    }

    return(
        <div className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-4 text-sm bg-gray-100 p-4 rounded-lg">
            {categories.map((category) => (
                <div key={category.name} className = {`flex items-center gap-2 py-2 px-1 justify-center rounded-md cursor-pointer ${selectedCategory === category.slug ? "bg-white": "text-gray-500 hover:bg-white"}`} onClick ={() => {handleCategoryClick(category.slug)}}>
                    {category.icon}
                    {category.name}
                </div>
            ))}
        </div>
    )
}

export default Categories