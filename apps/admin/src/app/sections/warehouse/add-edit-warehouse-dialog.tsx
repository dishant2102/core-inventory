import { yupResolver } from '@hookform/resolvers/yup';
import { useWarehouse } from '@libs/react-shared';
import { IWarehouse, WarehouseStatusEnum } from '@libs/types';
import { Button, Grid, Stack } from '@mui/material';
import { startCase } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { DefaultDialog } from '../../components/default-dialog';
import { FormContainer, RHFSelect, RHFTextField } from '../../form';
import { useToasty } from '../../hook';


export interface AddEditWarehouseDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    editValue?: IWarehouse | null;
}

const defaultValues: Partial<IWarehouse> = {
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    email: '',
    phone: '',
    status: WarehouseStatusEnum.ACTIVE,
};

const validationSchema = yupResolver(
    object().shape({
        name: string().trim().required().label('Warehouse Name'),
        code: string().trim().nullable().optional().label('Code'),
        email: string().trim().email().nullable().optional().label('Email'),
    }),
);

const statusOptions = Object.values(WarehouseStatusEnum).map((s) => ({ label: startCase(s), value: s }));

function AddEditWarehouseDialog({ open, onClose, onSuccess, editValue }: AddEditWarehouseDialogProps) {
    const { showToasty } = useToasty();
    const { useCreateWarehouse, useUpdateWarehouse } = useWarehouse();
    const { mutateAsync: createWarehouse } = useCreateWarehouse();
    const { mutateAsync: updateWarehouse } = useUpdateWarehouse();

    const isEdit = !!editValue?.id;
    const formContext = useForm({ defaultValues, resolver: validationSchema as any });
    const { reset, formState: { isSubmitting } } = formContext;

    useEffect(() => {
        if (open) {
            reset(isEdit ? { ...defaultValues, ...editValue } : defaultValues);
        }
    }, [open, editValue, isEdit, reset]);

    const handleSubmit = useCallback(
        async (values: any) => {
            const action = isEdit
                ? updateWarehouse({ ...values, id: editValue.id })
                : createWarehouse(values);

            action
                .then(() => {
                    showToasty(`Warehouse ${isEdit ? 'updated' : 'created'} successfully`);
                    onSuccess?.();
                    onClose();
                })
                .catch((err) => showToasty(err, 'error'));
        },
        [isEdit, editValue, createWarehouse, updateWarehouse, onSuccess, onClose, showToasty],
    );

    return (
        <DefaultDialog
            open={open}
            onClose={onClose}
            title={isEdit ? 'Edit Warehouse' : 'Add New Warehouse'}
            maxWidth="md"
            fullWidth
        >
            <FormContainer
                formProps={{ id: 'add-edit-warehouse-form' }}
                formContext={formContext}
                validationSchema={validationSchema}
                onSuccess={handleSubmit}
            >
                <Stack spacing={3}>
                    {/* Identity */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 8 }}>
                            <RHFTextField fullWidth required name="name" label="Warehouse Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <RHFTextField fullWidth name="code" label="Code" />
                        </Grid>
                    </Grid>

                    {/* Address */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <RHFTextField fullWidth name="address" label="Address" multiline rows={2} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <RHFTextField fullWidth name="city" label="City" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <RHFTextField fullWidth name="state" label="State / Province" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <RHFTextField fullWidth name="zipCode" label="ZIP / Postal Code" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <RHFTextField fullWidth name="country" label="Country" />
                        </Grid>
                    </Grid>

                    {/* Contact */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <RHFTextField fullWidth name="email" label="Email" type="email" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <RHFTextField fullWidth name="phone" label="Phone" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <RHFSelect
                                fullWidth
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
                    <Button variant="contained" type="submit" loading={isSubmitting}>
                        {isEdit ? 'Update Warehouse' : 'Create Warehouse'}
                    </Button>
                </Stack>
            </FormContainer>
        </DefaultDialog>
    );
}

export default AddEditWarehouseDialog;
