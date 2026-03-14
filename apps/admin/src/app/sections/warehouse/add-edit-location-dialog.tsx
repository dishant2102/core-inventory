import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from '@libs/react-shared';
import { ILocation, LocationStatusEnum } from '@libs/types';
import { Button, Stack } from '@mui/material';
import { startCase } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { DefaultDialog } from '../../components/default-dialog';
import { FormContainer, RHFSelect, RHFTextField } from '../../form';
import { useToasty } from '../../hook';


export interface AddEditLocationDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    /** Pre-set the warehouse for new locations */
    warehouseId?: string;
    editValue?: ILocation | null;
}

const validationSchema = yupResolver(
    object().shape({
        name: string().trim().required().label('Location Name'),
        code: string().trim().nullable().optional().label('Code'),
    }),
);

const statusOptions = Object.values(LocationStatusEnum).map((s) => ({ label: startCase(s), value: s }));

function AddEditLocationDialog({
    open, onClose, onSuccess, warehouseId, editValue,
}: AddEditLocationDialogProps) {
    const { showToasty } = useToasty();
    const { useCreateLocation, useUpdateLocation } = useLocation();
    const { mutateAsync: createLocation } = useCreateLocation();
    const { mutateAsync: updateLocation } = useUpdateLocation();

    const isEdit = !!editValue?.id;

    const formContext = useForm({ resolver: validationSchema as any });
    const { reset, formState: { isSubmitting } } = formContext;

    useEffect(() => {
        if (open) {
            reset(isEdit
                ? { name: editValue.name, code: editValue.code, status: editValue.status }
                : { name: '', code: '', status: LocationStatusEnum.ACTIVE },
            );
        }
    }, [open, editValue, isEdit, reset]);

    const handleSubmit = useCallback(
        async (values: any) => {
            const payload = { ...values, ...(isEdit ? { id: editValue.id } : { warehouseId }) };
            const action = isEdit ? updateLocation(payload) : createLocation(payload);

            action
                .then(() => {
                    showToasty(`Location ${isEdit ? 'updated' : 'added'} successfully`);
                    onSuccess?.();
                    onClose();
                })
                .catch((err) => showToasty(err, 'error'));
        },
        [isEdit, editValue, warehouseId, createLocation, updateLocation, onSuccess, onClose, showToasty],
    );

    return (
        <DefaultDialog
            open={open}
            onClose={onClose}
            title={isEdit ? 'Edit Location' : 'Add Location'}
            maxWidth="xs"
            fullWidth
        >
            <FormContainer
                formProps={{ id: 'add-edit-location-form' }}
                formContext={formContext}
                validationSchema={validationSchema}
                onSuccess={handleSubmit}
            >
                <Stack spacing={2.5}>
                    <RHFTextField fullWidth required autoFocus name="name" label="Location Name" />
                    <RHFTextField fullWidth name="code" label="Code" />
                    <RHFSelect
                        fullWidth
                        name="status"
                        label="Status"
                        options={statusOptions}
                        valueKey="value"
                        labelKey="label"
                    />
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" type="submit" loading={isSubmitting}>
                        {isEdit ? 'Update Location' : 'Add Location'}
                    </Button>
                </Stack>
            </FormContainer>
        </DefaultDialog>
    );
}

export default AddEditLocationDialog;
