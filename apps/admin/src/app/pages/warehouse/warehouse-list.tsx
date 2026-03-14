import { useWarehouse } from '@libs/react-shared';
import { IWarehouse, WarehouseStatusEnum } from '@libs/types';
import { Button, Card, Chip } from '@mui/material';
import { DataTableApi, DataTableColumn } from '@ackplus/react-tanstack-data-table';
import { startCase } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '../../components';
import CrudDataGrid from '../../components/data-grid/crud-data-grid';
import { PATH_DASHBOARD } from '../../routes/paths';
import AddEditWarehouseDialog from '../../sections/warehouse/add-edit-warehouse-dialog';


function WarehouseList() {
    const navigate = useNavigate();
    const datatableRef = useRef<DataTableApi<IWarehouse>>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editWarehouse, setEditWarehouse] = useState<IWarehouse | null>(null);

    const {
        useFetchManyWarehouse,
        useGetManyWarehouse,
        useDeleteWarehouse,
        useRestoreWarehouse,
        useDeleteForeverWarehouse,
        useBulkDeleteWarehouse,
        useBulkRestoreWarehouse,
        useBulkDeleteForeverWarehouse,
    } = useWarehouse();

    const handleView = useCallback(
        (row: IWarehouse) => navigate(PATH_DASHBOARD.warehouse.view(row.id)),
        [navigate],
    );

    const handleEdit = useCallback((row: IWarehouse) => {
        setEditWarehouse(row);
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
        setEditWarehouse(null);
    }, []);

    const handleSuccess = useCallback(() => {
        datatableRef.current?.data?.reload?.();
    }, []);

    const columns: DataTableColumn<IWarehouse>[] = [
        {
            accessorKey: 'name',
            header: 'Warehouse Name',
            enableGlobalFilter: true,
            enableSorting: true,
        },
        {
            accessorKey: 'code',
            header: 'Code',
            enableSorting: true,
            cell: ({ row }) => row.original?.code || '-',
        },
        {
            accessorKey: 'city',
            header: 'City',
            cell: ({ row }) => row.original?.city || '-',
        },
        {
            accessorKey: 'country',
            header: 'Country',
            cell: ({ row }) => row.original?.country || '-',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            cell: ({ row }) => row.original?.phone || '-',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: true,
            cell: ({ row }) => (
                <Chip
                    label={startCase(row.original?.status)}
                    color={row.original?.status === WarehouseStatusEnum.ACTIVE ? 'success' : 'default'}
                    size="small"
                />
            ),
        },
    ];

    return (
        <Page
            title="Warehouses"
            breadcrumbs={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Warehouses' },
            ]}
        >
            <Card>
                <CrudDataGrid
                    ref={datatableRef}
                    columns={columns}
                    crudName="Warehouse"
                    stateKey="warehouse-list"
                    exportFilename="warehouses"
                    hasSoftDelete
                    onView={handleView}
                    onEdit={handleEdit}
                    onRowClick={handleView}
                    crudOperationHooks={{
                        fetchMany: useFetchManyWarehouse,
                        useGetMany: useGetManyWarehouse,
                        useDelete: useDeleteWarehouse,
                        useRestore: useRestoreWarehouse,
                        useDeleteForever: useDeleteForeverWarehouse,
                        useBulkDelete: useBulkDeleteWarehouse,
                        useBulkRestore: useBulkRestoreWarehouse,
                        useBulkDeleteForever: useBulkDeleteForeverWarehouse,
                    }}
                    initialState={{
                        sorting: [{ id: 'createdAt', desc: true }],
                    }}
                    extraFilter={(
                        <Button
                            variant="contained"
                            onClick={() => {
                                setEditWarehouse(null);
                                setDialogOpen(true);
                            }}
                        >
                            Add Warehouse
                        </Button>
                    )}
                />
            </Card>

            <AddEditWarehouseDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                editValue={editWarehouse}
            />
        </Page>
    );
}

export default WarehouseList;
