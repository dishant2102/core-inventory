import React, { forwardRef } from 'react';
import { useController, Control } from 'react-hook-form';
import { FormInput, FormInputProps } from '../FormInput';

export type RHFTextFieldProps = FormInputProps & {
    name: string;
    control?: Control<any>;
};

export const RHFTextField = forwardRef<any, RHFTextFieldProps>(
    ({ name, control, ...other }, ref) => {
        const {
            field: { value, onChange, onBlur, ref: fieldRef },
            fieldState: { error },
        } = useController({ name, control });

        return (
            <FormInput
                ref={ref || fieldRef}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                {...other}
            />
        );
    }
);
