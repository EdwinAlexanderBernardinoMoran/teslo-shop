import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';

// interface Product {
//     id: string;
//     title: string;
//     price: number;
//     description: string;
//     slug: string;
//     stock: number;
//     sizes: string[];
//     gender: string;
//     tags: string[];
//     images: string[];
// }

export const AdminProductPage = () => {
    const { id } = useParams();

    const { isLoading, isError, data: product } = useProduct(id || '');

    const title = id === 'new' ? 'New product' : 'Edit product';

    const subtitle =
        id === 'new'
            ? 'Here you can create a new product.'
            : 'Here you can edit the product.';

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

    return <ProductForm product={product} title={title} subtitle={subtitle} />;
};