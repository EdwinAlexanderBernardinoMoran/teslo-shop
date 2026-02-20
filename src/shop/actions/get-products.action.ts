import { tesloApi } from "@/api/teslo.api"
import type { ProductsResponse } from "@/interfaces/products.response";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options {
    limit?: number | string;
    offset?: number | string;
    gender?: string;
    sizes?: string;
    minPrice?: number;
    maxPrice?: number;
}

export const getProductAction = async (options: Options) => {
    const { limit, offset, gender, sizes, minPrice, maxPrice } = options;
    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
        }
    });

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