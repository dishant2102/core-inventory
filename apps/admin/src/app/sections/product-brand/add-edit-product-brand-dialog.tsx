import { yupResolver } from '@hookform/resolvers/yup';
import { useProductBrand } from '@libs/react-shared';
import { IProductBrand } from '@libs/types';
import { Stack, Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { DefaultDialog } from '../../components/default-dialog';
import { FormContainer, RHFTextField } from '../../form';
import { useToasty } from '../../hook';


export interface AddEditProductBrandDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    /** Pass a brand to switch to edit mode */
    editValue?: IProductBrand | null;
}

const defaultValues: Partial<IProductBrand> = {
    name: '',
    description: '',
};

const validationSchema = yupResolver(
    object().shape({
        name: string().trim().required().label('Brand Name'),
        description: string().trim().nullable().optional().label('Description'),
    }),
);

function AddEditProductBrandDialog({
    open,
    onClose,
    onSuccess,
    editValue,
}: AddEditProductBrandDialogProps) {
    const { showToasty } = useToasty();
    const { useCreateProductBrand, useUpdateProductBrand } = useProductBrand();
    const { mutateAsync: createProductBrand } = useCreateProductBrand();
    const { mutateAsync: updateProductBrand } = useUpdateProductBrand();

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
                ? updateProductBrand({ ...values, id: editValue.id })
                : createProductBrand(values);

            action
                .then(() => {
                    showToasty(`Brand ${isEdit ? 'updated' : 'created'} successfully`);
                    onSuccess?.();
                    onClose();
                })
                .catch((error) => {
                    showToasty(error, 'error');
                });
        },
        [isEdit, editValue, createProductBrand, updateProductBrand, onSuccess, onClose, showToasty],
    );

    return (
        <DefaultDialog
            open={open}
            onClose={onClose}
            title={isEdit ? 'Edit Brand' : 'Add New Brand'}
            maxWidth="sm"
            fullWidth
        >
            <FormContainer
                formProps={{ id: 'add-edit-product-brand-form' }}
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
                        label="Brand Name"
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
                        {isEdit ? 'Update Brand' : 'Create Brand'}
                    </Button>
                </Stack>
            </FormContainer>
        </DefaultDialog>
    );
}

export default AddEditProductBrandDialog;
