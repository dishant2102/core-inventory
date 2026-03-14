import { yupResolver } from '@hookform/resolvers/yup';
import { DiscountTypeEnum, IProduct } from '@libs/types';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { startCase } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { number, object, string } from 'yup';

import { DefaultDialog } from '../../components/default-dialog';
import { FormContainer, RHFSelect, RHFTextField } from '../../form';


export interface EditProductPricingDialogProps {
    open: boolean;
    onClose: () => void;
    product?: IProduct | null;
    onSubmit: (values: IProduct) => Promise<void>;
}

const validationSchema = yupResolver(
    object().shape({
        price: number().nullable().optional().min(0).label('Price'),
        discount: number().nullable().optional().min(0).label('Discount'),
        discountType: string().nullable().optional().label('Discount Type'),
    }),
);

const discountTypeOptions = Object.values(DiscountTypeEnum).map((d) => ({
    label: startCase(d),
    value: d,
}));

function EditProductPricingDialog({ open, onClose, product, onSubmit }: EditProductPricingDialogProps) {
    const formContext = useForm({ resolver: validationSchema as any });
    const { reset, watch, formState: { isSubmitting } } = formContext;

    const watchPrice = watch('price');
    const watchDiscount = watch('discount');
    const watchDiscountType = watch('discountType');

    useEffect(() => {
        if (open && product) {
            reset({
                price: product.price ?? '',
                discount: product.discount ?? '',
                discountType: product.discountType ?? DiscountTypeEnum.PERCENTAGE,
            });
        }
    }, [open, product, reset]);

    // live final price calculation
    const finalPrice = (() => {
        const p = Number(watchPrice ?? 0);
        const d = Number(watchDiscount ?? 0);
        if (!p) return null;
        if (watchDiscountType === DiscountTypeEnum.PERCENTAGE) return p - (p * d) / 100;
        return p - d;
    })();

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
            title="Edit Pricing"
            maxWidth="xs"
            fullWidth
        >
            <FormContainer
                formProps={{ id: 'edit-product-pricing-form' }}
                formContext={formContext}
                validationSchema={validationSchema}
                onSuccess={handleSubmit}
            >
                <Stack spacing={2.5}>
                    <RHFTextField
                        fullWidth
                        name="price"
                        label="Base Price (₹)"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                    />
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 7 }}>
                            <RHFTextField
                                fullWidth
                                name="discount"
                                label="Discount"
                                type="number"
                                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 5 }}>
                            <RHFSelect
                                fullWidth
                                name="discountType"
                                label="Type"
                                options={discountTypeOptions}
                                valueKey="value"
                                labelKey="label"
                            />
                        </Grid>
                    </Grid>

                    {finalPrice != null && (
                        <>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" color="text.secondary">Final Price</Typography>
                                <Typography variant="h6" color="primary.main">
                                    ₹{finalPrice.toFixed(2)}
                                </Typography>
                            </Stack>
                        </>
                    )}
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" type="submit" loading={isSubmitting}>Save Changes</Button>
                </Stack>
            </FormContainer>
        </DefaultDialog>
    );
}

export default EditProductPricingDialog;
