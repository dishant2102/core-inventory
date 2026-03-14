import { yupResolver } from '@hookform/resolvers/yup';
import { useProductBrand, useProductCategory } from '@libs/react-shared';
import { IProduct, ProductStatusEnum } from '@libs/types';
import { Stack, Button, Grid, Divider } from '@mui/material';
import { startCase } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { DefaultDialog } from '../../components/default-dialog';
import { FormContainer, RHFSelect, RHFTextField } from '../../form';
import { useToasty } from '../../hook';


export interface EditProductBasicDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    product?: IProduct | null;
    onSubmit: (values: IProduct) => Promise<void>;
}

const validationSchema = yupResolver(
    object().shape({
        name: string().trim().required().label('Product Name'),
        sku: string().trim().nullable().optional().label('SKU'),
        shortDescription: string().trim().nullable().optional().label('Short Description'),
        description: string().trim().nullable().optional().label('Description'),
        status: string().required().label('Status'),
    }),
);

const statusOptions = Object.values(ProductStatusEnum).map((s) => ({ label: startCase(s), value: s }));

function EditProductBasicDialog({ open, onClose, product, onSubmit }: EditProductBasicDialogProps) {
    const { useGetManyProductCategory } = useProductCategory();
    const { useGetManyProductBrand } = useProductBrand();

    const { data: categoryData } = useGetManyProductCategory({ limit: 200 } as any);
    const { data: brandData } = useGetManyProductBrand({ limit: 200 } as any);

    const formContext = useForm({ resolver: validationSchema as any });
    const { reset, formState: { isSubmitting } } = formContext;

    useEffect(() => {
        if (open && product) {
            reset({
                name: product.name ?? '',
                sku: product.sku ?? '',
                shortDescription: product.shortDescription ?? '',
                description: product.description ?? '',
                status: product.status,
                categoryId: product.categoryId ?? '',
                brandId: (product as any).brandId ?? '',
            });
        }
    }, [open, product, reset]);

    const handleSubmit = useCallback(
        async (values: any) => {
            await onSubmit({ ...values, id: product?.id });
            onClose();
        },
        [onSubmit, onClose, product?.id],
    );

    return (
        <DefaultDialog
            open={open}
            onClose={onClose}
            title="Edit Basic Information"
            maxWidth="sm"
            fullWidth
        >
            <FormContainer
                formProps={{ id: 'edit-product-basic-form' }}
                formContext={formContext}
                validationSchema={validationSchema}
                onSuccess={handleSubmit}
            >
                <Stack spacing={2.5}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 8 }}>
                            <RHFTextField fullWidth required name="name" label="Product Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <RHFTextField fullWidth name="sku" label="SKU" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <RHFSelect
                                fullWidth
                                name="categoryId"
                                label="Category"
                                options={categoryData?.items || []}
                                valueKey="id"
                                labelKey="name"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <RHFSelect
                                fullWidth
                                name="brandId"
                                label="Brand"
                                options={brandData?.items || []}
                                valueKey="id"
                                labelKey="name"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <RHFTextField fullWidth name="shortDescription" label="Short Description" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <RHFTextField fullWidth name="description" label="Description" multiline rows={3} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <RHFSelect
                                fullWidth
                                required
                                name="status"
                                label="Status"
                                options={statusOptions}
                                valueKey="value"
                                labelKey="label"
                            />
                        </Grid>
                    </Grid>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" type="submit" loading={isSubmitting}>Save Changes</Button>
                </Stack>
            </FormContainer>
        </DefaultDialog>
    );
}

export default EditProductBasicDialog;
