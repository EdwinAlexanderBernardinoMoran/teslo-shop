import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJombotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {
    const { data } = useProducts();

    return (
        <>
            <CustomJombotron title="All products" description="Minimalist and elegant clothing inspired by Tesla's futuristic design. Premium quality for timeless style." />

            <ProductsGrid products={data?.products || []} />

            {/* Pagination */}
            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}