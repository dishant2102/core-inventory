import { useProductCategory } from '@libs/react-shared';
import { IProductCategory } from '@libs/types';
import { Button, Card } from '@mui/material';
import { DataTableApi, DataTableColumn } from '@ackplus/react-tanstack-data-table';
import { toDisplayDateTime } from '@libs/utils';
import { useCallback, useRef, useState } from 'react';

import { Page } from '../../components';
import CrudDataGrid from '../../components/data-grid/crud-data-grid';
import { PATH_DASHBOARD } from '../../routes/paths';
import AddEditProductCategoryDialog from '../../sections/product-category/add-edit-product-category-dialog';


function ProductCategoryList() {
    const datatableRef = useRef<DataTableApi<IProductCategory>>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<IProductCategory | null>(null);

    const {
        useFetchManyProductCategory,
        useGetManyProductCategory,
        useDeleteProductCategory,
        useRestoreProductCategory,
        useDeleteForeverProductCategory,
        useBulkDeleteProductCategory,
        useBulkRestoreProductCategory,
        useBulkDeleteForeverProductCategory,
    } = useProductCategory();

    const handleEdit = useCallback((row: IProductCategory) => {
        setEditCategory(row);
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
        setEditCategory(null);
    }, []);

    const handleSuccess = useCallback(() => {
        datatableRef.current?.data?.reload?.();
    }, []);

    const columns: DataTableColumn<IProductCategory>[] = [
        {
            accessorKey: 'name',
            header: 'Category Name',
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
            title="Product Categories"
            breadcrumbs={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Products', href: PATH_DASHBOARD.products.root },
                { name: 'Categories' },
            ]}
        >
            <Card>
                <CrudDataGrid
                    ref={datatableRef}
                    columns={columns}
                    crudName="Category"
                    stateKey="product-category-list"
                    exportFilename="product-categories"
                    hasSoftDelete
                    onEdit={handleEdit}
                    crudOperationHooks={{
                        fetchMany: useFetchManyProductCategory,
                        useGetMany: useGetManyProductCategory,
                        useDelete: useDeleteProductCategory,
                        useRestore: useRestoreProductCategory,
                        useDeleteForever: useDeleteForeverProductCategory,
                        useBulkDelete: useBulkDeleteProductCategory,
                        useBulkRestore: useBulkRestoreProductCategory,
                        useBulkDeleteForever: useBulkDeleteForeverProductCategory,
                    }}
                    initialState={{
                        sorting: [{ id: 'createdAt', desc: true }],
                    }}
                    extraFilter={(
                        <Button
                            variant="contained"
                            onClick={() => {
                                setEditCategory(null);
                                setDialogOpen(true);
                            }}
                        >
                            Add New
                        </Button>
                    )}
                />
            </Card>

            <AddEditProductCategoryDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                editValue={editCategory}
            />
        </Page>
    );
}

export default ProductCategoryList;
