import { IProductBrand } from '@libs/types';

import { ProductBrandService } from '../services';
import { useCrudOperations } from './use-crud-operations';


const productBrandService = ProductBrandService.getInstance<ProductBrandService>();

export const useProductBrand = () => {
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
    } = useCrudOperations<IProductBrand>(productBrandService);

    return {
        useGetManyProductBrand: useGetMany,
        useFetchManyProductBrand: fetchMany,
        useGetProductBrandById: useGetOne,
        useGetProductBrandCounts: useGetCounts,
        useCreateProductBrand: useCreate,
        useUpdateProductBrand: useUpdate,
        useDeleteProductBrand: useDelete,
        useRestoreProductBrand: useRestore,
        useDeleteForeverProductBrand: useDeleteForever,
        useBulkDeleteProductBrand: useBulkDelete,
        useBulkDeleteForeverProductBrand: useBulkDeleteForever,
        useBulkRestoreProductBrand: useBulkRestore,
    };
};
