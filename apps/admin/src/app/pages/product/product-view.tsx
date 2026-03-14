import { useProduct } from '@libs/react-shared';
import { DiscountTypeEnum, IProduct, ProductStatusEnum } from '@libs/types';
import {
    Box,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
    Button,
} from '@mui/material';
import { startCase } from 'lodash';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Icon, Page } from '../../components';
import { IconEnum } from '../../components/icons/icons';
import { InfoCard } from '../../components/info-card';
import PageLoading from '../../components/loading/page-loading';
import NotFound from '../error/not-found';
import { useToasty } from '../../hook';
import { PATH_DASHBOARD } from '../../routes/paths';
import ViewDetail from '../../components/view-detail';
import EditProductBasicDialog from '../../sections/product/edit-product-basic-dialog';
import EditProductPricingDialog from '../../sections/product/edit-product-pricing-dialog';


const statusColorMap: Record<ProductStatusEnum, 'success' | 'warning' | 'default'> = {
    [ProductStatusEnum.ACTIVE]: 'success',
    [ProductStatusEnum.INACTIVE]: 'default',
    [ProductStatusEnum.DRAFT]: 'warning',
};

function ProductView() {
    const { productId } = useParams<{ productId: string }>();
    const { showToasty } = useToasty();

    const { useGetProductById, useUpdateProduct } = useProduct();
    const { mutateAsync: updateProduct } = useUpdateProduct();

    const { data: product, isLoading, error, refetch } = useGetProductById(productId, {
        relations: ['category', 'brand'],
    } as any);

    const [basicDialogOpen, setBasicDialogOpen] = useState(false);
    const [pricingDialogOpen, setPricingDialogOpen] = useState(false);

    const handleUpdate = useCallback(
        async (values: IProduct) => {
            await updateProduct(values)
                .then(() => {
                    showToasty('Product updated successfully');
                    refetch();
                })
                .catch((error) => {
                    showToasty(error, 'error');
                    throw error; // re-throw so dialog stays open on error
                });
        },
        [updateProduct, showToasty, refetch],
    );

    if (isLoading) {
        return (
            <Page title="Loading...">
                <PageLoading />
            </Page>
        );
    }

    if (error || !product) {
        return (
            <NotFound
                entityType="Product"
                redirectPath={PATH_DASHBOARD.products.root}
            />
        );
    }

    const finalPrice = (() => {
        if (product?.price == null) return null;
        const p = Number(product.price);
        const d = Number(product.discount ?? 0);
        if (product.discountType === DiscountTypeEnum.PERCENTAGE) return p - (p * d) / 100;
        return p - d;
    })();

    return (
        <Page
            title={product?.name || 'Product Details'}
            breadcrumbs={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Products', href: PATH_DASHBOARD.products.root },
                { name: product?.name || 'Details' },
            ]}
        >
            <Grid container spacing={3}>

                {/* ── LEFT COLUMN ─────────────────────────────────── */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <InfoCard
                        title="Basic Information"
                        icon={<Icon icon={IconEnum.CircleUser} size="small" />}
                        editButton
                        onEdit={() => setBasicDialogOpen(true)}
                        showDivider
                    >
                        <Grid container spacing={2} sx={{ pt: 1 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ViewDetail variant="block" label="Product Name" value={product?.name} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ViewDetail variant="block" label="SKU" value={product?.sku} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ViewDetail variant="block" label="Brand" value={(product as any)?.brand?.name} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ViewDetail variant="block" label="Category" value={product?.category?.name} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <ViewDetail variant="block" label="Short Description" value={product?.shortDescription} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <ViewDetail variant="block" label="Description" value={product?.description} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="caption" color="text.secondary">Status</Typography>
                                <Box sx={{ mt: 0.5 }}>
                                    <Chip
                                        label={startCase(product?.status)}
                                        color={statusColorMap[product?.status]}
                                        size="small"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </InfoCard>
                </Grid>

                {/* ── RIGHT COLUMN ────────────────────────────────── */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <InfoCard
                        title="Pricing"
                        icon={<Icon icon={IconEnum.BadgeDollarSign} size="small" />}
                        editButton
                        onEdit={() => setPricingDialogOpen(true)}
                        showDivider
                    >
                        <Stack spacing={1.5} sx={{ pt: 1 }}>
                            <ViewDetail
                                variant="space-between"
                                label="Base Price"
                                value={product?.price != null ? `₹${Number(product.price).toFixed(2)}` : '-'}
                            />
                            <ViewDetail
                                variant="space-between"
                                label="Discount"
                                value={
                                    product?.discount
                                        ? product.discountType === DiscountTypeEnum.PERCENTAGE
                                            ? `${product.discount}%`
                                            : `₹${Number(product.discount).toFixed(2)}`
                                        : 'No discount'
                                }
                            />
                            <Divider />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle2">Final Price</Typography>
                                <Typography variant="h6" color="primary.main">
                                    {finalPrice != null ? `₹${finalPrice.toFixed(2)}` : '-'}
                                </Typography>
                            </Stack>
                        </Stack>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* ── BASIC INFO DIALOG ───────────────────────────────── */}
            <EditProductBasicDialog
                open={basicDialogOpen}
                onClose={() => setBasicDialogOpen(false)}
                product={product}
                onSubmit={handleUpdate}
            />

            {/* ── PRICING DIALOG ──────────────────────────────────── */}
            <EditProductPricingDialog
                open={pricingDialogOpen}
                onClose={() => setPricingDialogOpen(false)}
                product={product}
                onSubmit={handleUpdate}
            />
        </Page>
    );
}

export default ProductView;
