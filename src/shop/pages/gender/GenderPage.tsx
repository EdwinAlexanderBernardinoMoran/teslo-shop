import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJombotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"
import { useParams } from "react-router"

export const GenderPage = () => {
    const { gender } = useParams();
    const { data } = useProducts();

    const genderLabel = gender === 'men' ? 'Man' : gender === 'women' ? 'Woman' : 'Kid';
    return (
        <>
            <CustomJombotron title={`Products for ${genderLabel}s`} description="Minimalist and elegant clothing inspired by Tesla's futuristic design. Premium quality for timeless style." />

            <ProductsGrid products={data?.products || []} />

            {/* Pagination */}
            <CustomPagination totalPages={data?.pages || 1} />
        </>
    )
}