import { tesloApi } from "@/api/teslo.api"
import type { ProductsResponse } from "@/interfaces/products.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getProductAction = async () => {
    const { data } = await tesloApi.get<ProductsResponse>('/products')

    const productsWithImagesUrls = data.products.map((product) => ({
        ...product,
        images: product.images.map(
            (image) => `${BASE_URL}/files/product/${image}`
        ),
    }))

    return {
        ...data,
        products: productsWithImagesUrls,
    };
}