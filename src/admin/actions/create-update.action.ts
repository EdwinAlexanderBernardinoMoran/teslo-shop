import { tesloApi } from "@/api/teslo.api";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {

    await sleep(1500); // Simula una espera de 1.5 segundos

    const { id, user, images = [], files = [], ...rest } = productLike;

    const isCreating = id === 'new';

    rest.stock = Number(rest.stock) || 0;
    rest.price = Number(rest.price) || 0;

    // Prepara las imágenes para subir
    if (files.length > 0) {
        const newImageNames = await uploadFiles(files);
        images.push(...newImageNames);
    }
    // console.log({ images });
    const imageToSave = images.map(image => {
        if (image.includes('http')) return image.split('/').pop() || ''; // Extrae el nombre del archivo de la URL

        return image; // Si ya es un nombre de archivo, lo devuelve tal cual
    })


    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imageToSave,
        },
    })

    return {
        ...data,
        images: data.images.map((image) => {
            if (image.includes('http')) return image;
            return `${tesloApi.defaults.baseURL}/files/products/${image}`;
        })
    }
}

export interface FileUploadResponse {
    secureUrl: string;
    fileName: string;
}

const uploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await tesloApi<FileUploadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData,
        })

        return data.fileName;
    });

    const uploadedFileNames = await Promise.all(uploadPromises);

    return uploadedFileNames;
}