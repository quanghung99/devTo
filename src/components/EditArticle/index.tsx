// import { yupResolver } from '@hookform/resolvers/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Typography } from '@mui/material';
import InputField from 'components/common/CustomField/InputField';
import TextAreaField from 'components/common/CustomField/TextAreaField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const schema = yup.object({
	title: yup.string().required('Please enter the title'),
	description: yup.string().required('Please enter description'),
	body: yup.string().required('Please enter the body'),
	tagList: yup.string().required('Please enter tag'),
});
export default function EditArticlePage() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			body: '',
			tagList: '',
		},
		resolver: yupResolver(schema),
	});
	const onsubmit = (value: any) => {
		console.log(value);
	};
	return (
		<Container maxWidth="md">
			<form onSubmit={handleSubmit(onsubmit)}>
				<div>
					<InputField
						control={control}
						name="title"
						type={'text'}
						label=""
						placeholder="Article Title"
					></InputField>
					<InputField
						control={control}
						name="description"
						type={'text'}
						label=""
						placeholder="What is this article about?"
					></InputField>
					<TextAreaField
						control={control}
						name="body"
						type={'text'}
						label=""
						placeholder="Write your article "
					></TextAreaField>
					<Typography
						sx={{
							textAlign: 'left',
							padding: '0 12px',
							fontSize: '12px',
							color: '#d32f2f',
						}}
						component={'div'}
					>
						{errors.body?.message}
					</Typography>
					<InputField
						control={control}
						name="tagList"
						type={'text'}
						label=""
						placeholder="Enter tags"
					></InputField>
				</div>
				<Button type="submit" fullWidth variant="contained" color="primary">
					Submit
				</Button>
			</form>
		</Container>
	);
}
