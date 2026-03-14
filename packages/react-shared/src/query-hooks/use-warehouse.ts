import { IWarehouse } from '@libs/types';

import { WarehouseService } from '../services';
import { useCrudOperations } from './use-crud-operations';


const warehouseService = WarehouseService.getInstance<WarehouseService>();

export const useWarehouse = () => {
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
    } = useCrudOperations<IWarehouse>(warehouseService);

    return {
        useGetManyWarehouse: useGetMany,
        useFetchManyWarehouse: fetchMany,
        useGetWarehouseById: useGetOne,
        useGetWarehouseCounts: useGetCounts,
        useCreateWarehouse: useCreate,
        useUpdateWarehouse: useUpdate,
        useDeleteWarehouse: useDelete,
        useRestoreWarehouse: useRestore,
        useDeleteForeverWarehouse: useDeleteForever,
        useBulkDeleteWarehouse: useBulkDelete,
        useBulkDeleteForeverWarehouse: useBulkDeleteForever,
        useBulkRestoreWarehouse: useBulkRestore,
    };
};
