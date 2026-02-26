import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update.action";

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes

    })

    // TODO: mutacion
    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            console.log(`Todo salio bien ${product}`);

            // Invalidar cache
            queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalida la lista de productos
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] }); // Invalida el producto específico

            // Actualizar queryData
            queryClient.setQueryData(['products', { id: product.id }], product); // Actualiza el producto específico en cache
        }
    })

    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike);
    // }


    return {
        ...query,
        mutation
    };
};