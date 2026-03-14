import { useProduct } from '@libs/react-shared';
import { IProduct } from '@libs/types';
import { useCallback } from 'react';

import { DefaultDialog } from '../../components/default-dialog';
import { useToasty } from '../../hook';
import AddEditProductForm from './add-edit-product-form';


export interface AddProductDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

function AddProductDialog({ open, onClose, onSuccess }: AddProductDialogProps) {
    const { showToasty } = useToasty();
    const { useCreateProduct } = useProduct();
    const { mutateAsync: createProduct } = useCreateProduct();

    const handleSubmit = useCallback(
        async (values: IProduct) => {
            createProduct(values)
                .then(() => {
                    showToasty('Product created successfully');
                    onSuccess?.();
                    onClose();
                })
                .catch((error) => {
                    showToasty(error, 'error');
                });
        },
        [createProduct, onClose, onSuccess, showToasty],
    );

    return (
        <DefaultDialog
            open={open}
            onClose={onClose}
            title="Add New Product"
            maxWidth="md"
            fullWidth
        >
            <AddEditProductForm
                onSubmit={handleSubmit}
                onCancel={onClose}
            />
        </DefaultDialog>
    );
}

export default AddProductDialog;
