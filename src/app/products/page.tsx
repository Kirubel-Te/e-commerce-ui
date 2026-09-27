import ProductsList from '@/components/ProductsList'


const ProductsPage = async({searchParams}:{searchParams: Promise<{category:string, sort?: string, search?: string}>}) => {
    const { category, sort, search } = await searchParams;
    return(
        <div>
            <ProductsList category={category} sort={sort} search={search} params="products" />
        </div>
    )
}

export default ProductsPage