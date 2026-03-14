import { useLocation, useWarehouse } from '@libs/react-shared';
import { ILocation, IWarehouse, LocationStatusEnum, WarehouseStatusEnum } from '@libs/types';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
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
import AddEditWarehouseDialog from '../../sections/warehouse/add-edit-warehouse-dialog';
import AddEditLocationDialog from '../../sections/warehouse/add-edit-location-dialog';
import { useConfirm } from '../../contexts';


const warehouseStatusColor = (status?: WarehouseStatusEnum) =>
    status === WarehouseStatusEnum.ACTIVE ? 'success' : 'default';

const locationStatusColor = (status?: LocationStatusEnum) =>
    status === LocationStatusEnum.ACTIVE ? 'success' : 'default';

function WarehouseView() {
    const { warehouseId } = useParams<{ warehouseId: string }>();
    const { showToasty } = useToasty();
    const confirmDialog = useConfirm();

    // Warehouse
    const { useGetWarehouseById } = useWarehouse();
    const { data: warehouse, isLoading, error, refetch } = useGetWarehouseById(warehouseId, {
        relations: ['locations'],
    } as any);

    // Location
    const { useGetManyLocation, useDeleteLocation } = useLocation();
    const { data: locationData, refetch: refetchLocations } = useGetManyLocation({
        filter: [{ field: 'warehouseId', operator: 'eq', value: warehouseId }],
        limit: 200,
    } as any);
    const { mutateAsync: deleteLocation } = useDeleteLocation();

    // Dialogs
    const [warehouseDialogOpen, setWarehouseDialogOpen] = useState(false);
    const [locationDialogOpen, setLocationDialogOpen] = useState(false);
    const [editLocation, setEditLocation] = useState<ILocation | null>(null);

    const handleEditWarehouse = useCallback(() => setWarehouseDialogOpen(true), []);
    const handleWarehouseSuccess = useCallback(() => {
        setWarehouseDialogOpen(false);
        refetch();
    }, [refetch]);

    const handleAddLocation = useCallback(() => {
        setEditLocation(null);
        setLocationDialogOpen(true);
    }, []);
    const handleEditLocation = useCallback((loc: ILocation) => {
        setEditLocation(loc);
        setLocationDialogOpen(true);
    }, []);
    const handleLocationDialogClose = useCallback(() => {
        setLocationDialogOpen(false);
        setEditLocation(null);
    }, []);
    const handleLocationSuccess = useCallback(() => {
        refetchLocations();
    }, [refetchLocations]);

    const handleDeleteLocation = useCallback(
        async (loc: ILocation) => {
            const confirmed = await confirmDialog({
                title: 'Delete Location',
                content: `Are you sure you want to delete "${loc.name}"?`,
            });
            if (!confirmed) return;
            deleteLocation(loc.id)
                .then(() => {
                    showToasty('Location deleted');
                    refetchLocations();
                })
                .catch((err) => showToasty(err, 'error'));
        },
        [confirmDialog, deleteLocation, showToasty, refetchLocations],
    );

    if (isLoading) {
        return (
            <Page title="Loading...">
                <PageLoading />
            </Page>
        );
    }

    if (error || !warehouse) {
        return <NotFound entityType="Warehouse" redirectPath={PATH_DASHBOARD.warehouse.root} />;
    }

    const locations: ILocation[] = locationData?.items || [];

    return (
        <Page
            title={warehouse?.name || 'Warehouse'}
            breadcrumbs={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Warehouses', href: PATH_DASHBOARD.warehouse.root },
                { name: warehouse?.name || 'Details' },
            ]}
            actions={(
                <Button
                    variant="contained"
                    startIcon={<Icon icon={IconEnum.Pencil} size="small" />}
                    onClick={handleEditWarehouse}
                >
                    Edit Warehouse
                </Button>
            )}
        >
            <Grid container spacing={3}>

                {/* ── LEFT COLUMN — Warehouse Details ─────────────── */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Stack spacing={3}>

                        {/* Basic Info */}
                        <InfoCard
                            title="Warehouse Information"
                            icon={<Icon icon={IconEnum.Package} size="small" />}
                            editButton
                            onEdit={handleEditWarehouse}
                            showDivider
                        >
                            <Grid container spacing={2} sx={{ pt: 1 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <ViewDetail variant="block" label="Name" value={warehouse?.name} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <ViewDetail variant="block" label="Code" value={warehouse?.code} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="caption" color="text.secondary">Status</Typography>
                                    <Box sx={{ mt: 0.5 }}>
                                        <Chip
                                            label={startCase(warehouse?.status)}
                                            color={warehouseStatusColor(warehouse?.status)}
                                            size="small"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </InfoCard>

                        {/* Address */}
                        <InfoCard
                            title="Address"
                            icon={<Icon icon={IconEnum.MapPin} size="small" />}
                            editButton
                            onEdit={handleEditWarehouse}
                            showDivider
                        >
                            <Grid container spacing={2} sx={{ pt: 1 }}>
                                <Grid size={{ xs: 12 }}>
                                    <ViewDetail variant="block" label="Street Address" value={warehouse?.address} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <ViewDetail variant="block" label="City" value={warehouse?.city} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <ViewDetail variant="block" label="State" value={warehouse?.state} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <ViewDetail variant="block" label="ZIP Code" value={warehouse?.zipCode} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <ViewDetail variant="block" label="Country" value={warehouse?.country} />
                                </Grid>
                            </Grid>
                        </InfoCard>

                    </Stack>
                </Grid>

                {/* ── RIGHT COLUMN — Contact ───────────────────────── */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <InfoCard
                        title="Contact"
                        icon={<Icon icon={IconEnum.Phone} size="small" />}
                        editButton
                        onEdit={handleEditWarehouse}
                        showDivider
                    >
                        <Stack spacing={1} sx={{ pt: 1 }}>
                            <ViewDetail
                                variant="space-between"
                                label="Email"
                                icon={<Icon icon={IconEnum.Mail} size="small" />}
                                value={warehouse?.email}
                            />
                            <ViewDetail
                                variant="space-between"
                                label="Phone"
                                icon={<Icon icon={IconEnum.Phone} size="small" />}
                                value={warehouse?.phone}
                            />
                        </Stack>
                    </InfoCard>
                </Grid>

                {/* ── LOCATIONS SECTION ─────────────────────────────── */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2 }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Icon icon={IconEnum.MapPin} size="small" />
                                    <Typography variant="h6">Locations</Typography>
                                    <Chip
                                        label={locations.length}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                </Stack>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<Icon icon={IconEnum.Plus} size="small" />}
                                    onClick={handleAddLocation}
                                >
                                    Add Location
                                </Button>
                            </Stack>

                            <Divider sx={{ mb: 2 }} />

                            {locations.length === 0 ? (
                                <Box
                                    sx={{
                                        py: 6,
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        bgcolor: 'background.neutral',
                                    }}
                                >
                                    <Icon icon={IconEnum.MapPin} size="large" />
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        No locations added yet
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 2 }}
                                        onClick={handleAddLocation}
                                    >
                                        Add First Location
                                    </Button>
                                </Box>
                            ) : (
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Location Name</TableCell>
                                                <TableCell>Code</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell align="right">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {locations.map((loc) => (
                                                <TableRow
                                                    key={loc.id}
                                                    hover
                                                    sx={{ '&:last-child td': { border: 0 } }}
                                                >
                                                    <TableCell>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {loc.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {loc.code || '-'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={startCase(loc.status)}
                                                            color={locationStatusColor(loc.status)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                            <Tooltip title="Edit">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleEditLocation(loc)}
                                                                >
                                                                    <Icon icon={IconEnum.Pencil} size="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    size="small"
                                                                    color="error"
                                                                    onClick={() => handleDeleteLocation(loc)}
                                                                >
                                                                    <Icon icon={IconEnum.Trash} size="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            {/* ── EDIT WAREHOUSE DIALOG ───────────────────────────── */}
            <AddEditWarehouseDialog
                open={warehouseDialogOpen}
                onClose={() => setWarehouseDialogOpen(false)}
                onSuccess={handleWarehouseSuccess}
                editValue={warehouse}
            />

            {/* ── ADD / EDIT LOCATION DIALOG ──────────────────────── */}
            <AddEditLocationDialog
                open={locationDialogOpen}
                onClose={handleLocationDialogClose}
                onSuccess={handleLocationSuccess}
                warehouseId={warehouseId}
                editValue={editLocation}
            />
        </Page>
    );
}

export default WarehouseView;
