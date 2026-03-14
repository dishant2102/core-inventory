import { useProduct } from '@libs/react-shared';
import { IProduct } from '@libs/types';
import { Button, Card } from '@mui/material';
import { DataTableColumn } from '@ackplus/react-tanstack-data-table';
import { DataTableApi } from '@ackplus/react-tanstack-data-table';
import { startCase } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '../../components';
import CrudDataGrid from '../../components/data-grid/crud-data-grid';
import { PATH_DASHBOARD } from '../../routes/paths';
import AddProductDialog from '../../sections/product/add-product-dialog';


function ProductList() {
    const navigate = useNavigate();
    const datatableRef = useRef<DataTableApi<IProduct>>(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const {
        useFetchManyProduct,
        useGetManyProduct,
        useDeleteProduct,
        useRestoreProduct,
        useDeleteForeverProduct,
        useBulkDeleteProduct,
        useBulkDeleteForeverProduct,
        useBulkRestoreProduct,
    } = useProduct();

    const handleView = useCallback(
        (row: IProduct) => navigate(PATH_DASHBOARD.products.view(row.id)),
        [navigate],
    );

    const handleEdit = useCallback(
        (row: IProduct) => navigate(PATH_DASHBOARD.products.edit(row.id)),
        [navigate],
    );

    const handleAddSuccess = useCallback(() => {
        datatableRef.current?.data?.reload?.();
    }, []);

    const columns: DataTableColumn<IProduct>[] = [
        {
            accessorKey: 'name',
            header: 'Product Name',
            enableGlobalFilter: true,
            enableSorting: true,
        },
        {
            accessorKey: 'sku',
            header: 'SKU',
            enableGlobalFilter: true,
            enableSorting: true,
            cell: ({ row }) => row.original?.sku || '-',
        },
        {
            accessorKey: 'price',
            header: 'Price',
            enableSorting: true,
            cell: ({ row }) =>
                row.original?.price != null ? `₹${Number(row.original.price).toFixed(2)}` : '-',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: true,
            cell: ({ row }) => startCase(row.original?.status || ''),
        },
        {
            accessorKey: 'category.name',
            header: 'Category',
            cell: ({ row }) => row.original?.category?.name || '-',
        },
        {
            accessorKey: 'brand.name',
            header: 'Brand',
            cell: ({ row }) => (row.original as any)?.brand?.name || '-',
        },
    ];

    return (
        <Page
            title="Products"
            breadcrumbs={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Products' },
            ]}
        >
            <Card>
                <CrudDataGrid
                    ref={datatableRef}
                    columns={columns}
                    crudName="Product"
                    stateKey="product-list"
                    exportFilename="products"
                    hasSoftDelete
                    onEdit={handleEdit}
                    onView={handleView}
                    onRowClick={handleView}
                    crudOperationHooks={{
                        fetchMany: useFetchManyProduct,
                        useGetMany: useGetManyProduct,
                        useDelete: useDeleteProduct,
                        useRestore: useRestoreProduct,
                        useDeleteForever: useDeleteForeverProduct,
                        useBulkDelete: useBulkDeleteProduct,
                        useBulkRestore: useBulkRestoreProduct,
                        useBulkDeleteForever: useBulkDeleteForeverProduct,
                    }}
                    initialState={{
                        sorting: [{ id: 'createdAt', desc: true }],
                    }}
                    extraFilter={(
                        <Button
                            variant="contained"
                            onClick={() => setAddDialogOpen(true)}
                        >
                            Add New
                        </Button>
                    )}
                />
            </Card>

            <AddProductDialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                onSuccess={handleAddSuccess}
            />
        </Page>
    );
}

export default ProductList;
