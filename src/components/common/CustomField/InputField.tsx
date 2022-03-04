import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	name: string;
	label: string;
	placeholder?: string;
}

export default function InputField({
	control,
	name,
	label,
	...inputProps
}: InputFieldProps) {
	const {
		field: { onBlur, onChange, value, ref },
		fieldState: { error, invalid },
	} = useController({
		name: name,
		control: control,
	});
	return (
		<>
			<TextField
				fullWidth
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				label={label}
				inputRef={ref}
				error={invalid}
				helperText={error?.message}
				variant="outlined"
				inputProps={inputProps}
				margin={'normal'}
				placeholder={inputProps.placeholder}
			/>
		</>
	);
}
