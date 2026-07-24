import { Search } from "lucide-react";

const SearchBar = () => {
    return(
        <div className = "hidden sm:flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1">
            <Search className="text-gray-500 w-4 h-4" />
            <input type="text" placeholder = "Search..." className = "text-sm outline-0"/>
        </div>
    )
}

export default SearchBar;