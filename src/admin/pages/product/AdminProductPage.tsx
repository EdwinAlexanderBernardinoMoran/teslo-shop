import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, isError, data: product, mutation } = useProduct(id || '');

    const title = id === 'new' ? 'New product' : 'Edit product';

    const subtitle =
        id === 'new'
            ? 'Here you can create a new product.'
            : 'Here you can edit the product.';

    const handleSubmit = async (productLike: Partial<Product>) => {
        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {
                toast.success(`Product saved successfully!`, {
                    position: 'top-right',
                });
                navigate(`/admin/products/${data.id}`); // Redirige al producto recién creado o editado
            },
            onError: (error) => {
                console.log(error);
                toast.error(`Error saving product`);
            }
        });
    }
    // Validators
    if (isError) {
        return <Navigate to="/admin/products" />;
    }

    if (isLoading) {
        return <CustomFullScreenLoading />;
    }

    if (!product) {
        return <Navigate to="/admin/products" />;
    }

    return <ProductForm product={product} title={title} subtitle={subtitle} isLoading={mutation.isPending} onSubmit={handleSubmit} />;
};