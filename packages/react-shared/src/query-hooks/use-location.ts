import { ILocation } from '@libs/types';

import { LocationService } from '../services';
import { useCrudOperations } from './use-crud-operations';


const locationService = LocationService.getInstance<LocationService>();

export const useLocation = () => {
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
    } = useCrudOperations<ILocation>(locationService);

    return {
        useGetManyLocation: useGetMany,
        useFetchManyLocation: fetchMany,
        useGetLocationById: useGetOne,
        useGetLocationCounts: useGetCounts,
        useCreateLocation: useCreate,
        useUpdateLocation: useUpdate,
        useDeleteLocation: useDelete,
        useRestoreLocation: useRestore,
        useDeleteForeverLocation: useDeleteForever,
        useBulkDeleteLocation: useBulkDelete,
        useBulkDeleteForeverLocation: useBulkDeleteForever,
        useBulkRestoreLocation: useBulkRestore,
    };
};
