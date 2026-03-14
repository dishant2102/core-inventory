import { useProductBrand } from '@libs/react-shared';
import { IProductBrand } from '@libs/types';
import { Button, Card } from '@mui/material';
import { DataTableApi, DataTableColumn } from '@ackplus/react-tanstack-data-table';
import { toDisplayDateTime } from '@libs/utils';
import { useCallback, useRef, useState } from 'react';

import { Page } from '../../components';
import CrudDataGrid from '../../components/data-grid/crud-data-grid';
import { PATH_DASHBOARD } from '../../routes/paths';
import AddEditProductBrandDialog from '../../sections/product-brand/add-edit-product-brand-dialog';


function ProductBrandList() {
    const datatableRef = useRef<DataTableApi<IProductBrand>>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editBrand, setEditBrand] = useState<IProductBrand | null>(null);

    const {
        useFetchManyProductBrand,
        useGetManyProductBrand,
        useDeleteProductBrand,
        useRestoreProductBrand,
        useDeleteForeverProductBrand,
        useBulkDeleteProductBrand,
        useBulkRestoreProductBrand,
        useBulkDeleteForeverProductBrand,
    } = useProductBrand();

    const handleEdit = useCallback((row: IProductBrand) => {
        setEditBrand(row);
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
        setEditBrand(null);
    }, []);

    const handleSuccess = useCallback(() => {
        datatableRef.current?.data?.reload?.();
    }, []);

    const columns: DataTableColumn<IProductBrand>[] = [
        {
            accessorKey: 'name',
            header: 'Brand Name',
            enableGlobalFilter: true,
            enableSorting: true,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            enableSorting: false,
            cell: ({ row }) => row.original?.description || '-',
        },
        {
            accessorKey: 'createdAt',
            header: 'Created Date',
            enableSorting: true,
            type: 'date',
            accessorFn: (row) => toDisplayDateTime(row.createdAt),
        },
    ];

    return (
        <Page
            title="Product Brands"
            breadcrumbs={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Products', href: PATH_DASHBOARD.products.root },
                { name: 'Brands' },
            ]}
        >
            <Card>
                <CrudDataGrid
                    ref={datatableRef}
                    columns={columns}
                    crudName="Brand"
                    stateKey="product-brand-list"
                    exportFilename="product-brands"
                    hasSoftDelete
                    onEdit={handleEdit}
                    crudOperationHooks={{
                        fetchMany: useFetchManyProductBrand,
                        useGetMany: useGetManyProductBrand,
                        useDelete: useDeleteProductBrand,
                        useRestore: useRestoreProductBrand,
                        useDeleteForever: useDeleteForeverProductBrand,
                        useBulkDelete: useBulkDeleteProductBrand,
                        useBulkRestore: useBulkRestoreProductBrand,
                        useBulkDeleteForever: useBulkDeleteForeverProductBrand,
                    }}
                    initialState={{
                        sorting: [{ id: 'createdAt', desc: true }],
                    }}
                    extraFilter={(
                        <Button
                            variant="contained"
                            onClick={() => {
                                setEditBrand(null);
                                setDialogOpen(true);
                            }}
                        >
                            Add New
                        </Button>
                    )}
                />
            </Card>

            <AddEditProductBrandDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                editValue={editBrand}
            />
        </Page>
    );
}

export default ProductBrandList;
