import { yupResolver } from '@hookform/resolvers/yup';
import { useProduct, useProductBrand, useProductCategory } from '@libs/react-shared';
import { DiscountTypeEnum, IProduct, ProductStatusEnum } from '@libs/types';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { startCase } from 'lodash';
import { object, string, number } from 'yup';

import { FormContainer, RHFSelect, RHFTextField } from '../../form';


export interface AddEditProductFormProps {
    values?: IProduct;
    onSubmit: (values: IProduct) => void;
    onCancel?: () => void;
    isSubmitting?: boolean;
}

const defaultValues: Partial<IProduct> = {
    name: '',
    sku: '',
    price: undefined,
    discount: undefined,
    discountType: DiscountTypeEnum.PERCENTAGE,
    shortDescription: '',
    description: '',
    status: ProductStatusEnum.ACTIVE,
    categoryId: undefined,
    brandId: undefined,
};

const validationSchema = yupResolver(
    object().shape({
        name: string().trim().required().label('Product Name'),
        sku: string().trim().nullable().optional().label('SKU'),
        price: number().nullable().optional().min(0).label('Price'),
        discount: number().nullable().optional().min(0).label('Discount'),
        shortDescription: string().trim().nullable().optional().label('Short Description'),
        description: string().trim().nullable().optional().label('Description'),
        status: string().required().label('Status'),
    }),
);

function AddEditProductForm({ onSubmit, values, onCancel }: AddEditProductFormProps) {
    const { useGetManyProductCategory } = useProductCategory();
    const { useGetManyProductBrand } = useProductBrand();

    const { data: categoryData } = useGetManyProductCategory({ limit: 200 } as any);
    const { data: brandData } = useGetManyProductBrand({ limit: 200 } as any);

    const formContext = useForm({
        defaultValues,
        resolver: validationSchema as any,
    });
    const { reset, formState: { isSubmitting } } = formContext;

    useEffect(() => {
        reset({ ...defaultValues, ...values });
    }, [values, reset]);

    const handleSubmit = useCallback(
        (formValues: any) => {
            onSubmit({ ...formValues, id: values?.id });
        },
        [onSubmit, values?.id],
    );

    const statusOptions = Object.values(ProductStatusEnum).map((s) => ({ label: startCase(s), value: s }));
    const discountTypeOptions = Object.values(DiscountTypeEnum).map((d) => ({ label: startCase(d), value: d }));

    return (
        <FormContainer
            formProps={{ id: 'add-edit-product-form' }}
            formContext={formContext}
            validationSchema={validationSchema}
            onSuccess={handleSubmit}
        >
            {/* Basic Info */}
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                Basic Information
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 8 }}>
                    <RHFTextField fullWidth required name="name" label="Product Name" />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <RHFTextField fullWidth name="sku" label="SKU" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <RHFTextField fullWidth name="shortDescription" label="Short Description" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <RHFTextField
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        rows={3}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Pricing */}
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                Pricing
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <RHFTextField
                        fullWidth
                        name="price"
                        label="Price"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <RHFTextField
                        fullWidth
                        name="discount"
                        label="Discount"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <RHFSelect
                        fullWidth
                        name="discountType"
                        label="Discount Type"
                        options={discountTypeOptions}
                        valueKey="value"
                        labelKey="label"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Details */}
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                Product Details
            </Typography>
            <Grid container spacing={2}>
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

            {/* Actions */}
            <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="flex-end">
                {onCancel && (
                    <Button variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button variant="contained" type="submit" loading={isSubmitting}>
                    {values?.id ? 'Update Product' : 'Create Product'}
                </Button>
            </Stack>
        </FormContainer>
    );
}

export default AddEditProductForm;
