import { IProduct } from '@libs/types';

import { ProductService } from '../services';
import { useCrudOperations } from './use-crud-operations';


const productService = ProductService.getInstance<ProductService>();

export const useProduct = () => {
    const {
        useGetMany,
        fetchMany,
        useGetCounts,
        useGetOne,
        useCreate,
        useUpdate,
        useDelete,
        useRestore,
        useDeleteForever,
        useBulkDelete,
        useBulkDeleteForever,
        useBulkRestore,
    } = useCrudOperations<IProduct>(productService);

    return {
        useGetManyProduct: useGetMany,
        useFetchManyProduct: fetchMany,
        useGetProductById: useGetOne,
        useGetProductCounts: useGetCounts,
        useCreateProduct: useCreate,
        useUpdateProduct: useUpdate,
        useDeleteProduct: useDelete,
        useRestoreProduct: useRestore,
        useDeleteForeverProduct: useDeleteForever,
        useBulkDeleteProduct: useBulkDelete,
        useBulkDeleteForeverProduct: useBulkDeleteForever,
        useBulkRestoreProduct: useBulkRestore,
    };
};
