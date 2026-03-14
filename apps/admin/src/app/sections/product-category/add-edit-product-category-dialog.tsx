import { yupResolver } from '@hookform/resolvers/yup';
import { useProductCategory } from '@libs/react-shared';
import { IProductCategory } from '@libs/types';
import { Stack, Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { DefaultDialog } from '../../components/default-dialog';
import { FormContainer, RHFTextField } from '../../form';
import { useToasty } from '../../hook';


export interface AddEditProductCategoryDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    /** Pass a category to switch to edit mode */
    editValue?: IProductCategory | null;
}

const defaultValues: Partial<IProductCategory> = {
    name: '',
    description: '',
};

const validationSchema = yupResolver(
    object().shape({
        name: string().trim().required().label('Category Name'),
        description: string().trim().nullable().optional().label('Description'),
    }),
);

function AddEditProductCategoryDialog({
    open,
    onClose,
    onSuccess,
    editValue,
}: AddEditProductCategoryDialogProps) {
    const { showToasty } = useToasty();
    const { useCreateProductCategory, useUpdateProductCategory } = useProductCategory();
    const { mutateAsync: createProductCategory } = useCreateProductCategory();
    const { mutateAsync: updateProductCategory } = useUpdateProductCategory();

    const isEdit = !!editValue?.id;

    const formContext = useForm({
        defaultValues,
        resolver: validationSchema as any,
    });
    const { reset, formState: { isSubmitting } } = formContext;

    useEffect(() => {
        if (open) {
            reset(isEdit ? { name: editValue.name, description: editValue.description } : defaultValues);
        }
    }, [open, editValue, isEdit, reset]);

    const handleSubmit = useCallback(
        async (values: any) => {
            const action = isEdit
                ? updateProductCategory({ ...values, id: editValue.id })
                : createProductCategory(values);

            action
                .then(() => {
                    showToasty(`Category ${isEdit ? 'updated' : 'created'} successfully`);
                    onSuccess?.();
                    onClose();
                })
                .catch((error) => {
                    showToasty(error, 'error');
                });
        },
        [isEdit, editValue, createProductCategory, updateProductCategory, onSuccess, onClose, showToasty],
    );

    return (
        <DefaultDialog
            open={open}
            onClose={onClose}
            title={isEdit ? 'Edit Category' : 'Add New Category'}
            maxWidth="sm"
            fullWidth
        >
            <FormContainer
                formProps={{ id: 'add-edit-product-category-form' }}
                formContext={formContext}
                validationSchema={validationSchema}
                onSuccess={handleSubmit}
            >
                <Stack spacing={2.5}>
                    <RHFTextField
                        fullWidth
                        required
                        autoFocus
                        name="name"
                        label="Category Name"
                    />
                    <RHFTextField
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        rows={3}
                    />
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit" loading={isSubmitting}>
                        {isEdit ? 'Update Category' : 'Create Category'}
                    </Button>
                </Stack>
            </FormContainer>
        </DefaultDialog>
    );
}

export default AddEditProductCategoryDialog;
