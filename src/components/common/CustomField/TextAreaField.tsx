import { TextareaAutosize, TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface TextAreaFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	control: Control<any>;
	name: string;
	label: string;
	placeholder?: string;
}

export default function TextAreaField({
	control,
	name,
	label,
	...inputProps
}: TextAreaFieldProps) {
	const {
		field: { onBlur, onChange, value, ref },
		fieldState: { error, invalid },
	} = useController({
		name: name,
		control: control,
	});
	return (
		<div>
			<TextareaAutosize
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				minRows={10}
				placeholder={inputProps.placeholder}
				style={{
					boxSizing: 'border-box',
					width: '100%',
					borderRadius: '10px',
					padding: '16px 14px',
					fontSize: '16px',
					outlineColor: '#66afe9',
				}}
			/>
		</div>
	);
}
