import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJombotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"

export const HomePage = () => {
    return (
        <>
            <CustomJombotron title="All products" description="Minimalist and elegant clothing inspired by Tesla's futuristic design. Premium quality for timeless style." />

            <ProductsGrid products={products} />

            {/* Pagination */}
            <CustomPagination totalPages={7} />
        </>
    )
}