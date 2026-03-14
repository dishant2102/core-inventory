import { IProductCategory } from '@libs/types';

import { ProductCategoryService } from '../services';
import { useCrudOperations } from './use-crud-operations';


const productCategoryService = ProductCategoryService.getInstance<ProductCategoryService>();

export const useProductCategory = () => {
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
    } = useCrudOperations<IProductCategory>(productCategoryService);

    return {
        useGetManyProductCategory: useGetMany,
        useFetchManyProductCategory: fetchMany,
        useGetProductCategoryById: useGetOne,
        useGetProductCategoryCounts: useGetCounts,
        useCreateProductCategory: useCreate,
        useUpdateProductCategory: useUpdate,
        useDeleteProductCategory: useDelete,
        useRestoreProductCategory: useRestore,
        useDeleteForeverProductCategory: useDeleteForever,
        useBulkDeleteProductCategory: useBulkDelete,
        useBulkDeleteForeverProductCategory: useBulkDeleteForever,
        useBulkRestoreProductCategory: useBulkRestore,
    };
};
