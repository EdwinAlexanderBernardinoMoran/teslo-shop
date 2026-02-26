import { tesloApi } from "@/api/teslo.api";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (productLike: Partial<Product>): Promise<Product> => {

    await sleep(1500); // Simula una espera de 1.5 segundos

    const { id, user, images = [], ...rest } = productLike;

    const isCreating = id === 'new';

    rest.stock = Number(rest.stock) || 0;
    rest.price = Number(rest.price) || 0;

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: rest,
    })

    return {
        ...data,
        images: data.images.map((image) => {
            if (image.includes('http')) return image;
            return `${tesloApi.defaults.baseURL}/files/products/${image}`;
        })
    }
}