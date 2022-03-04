import { Lock } from '@mui/icons-material';
import { Button, Container, Paper, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import InputField from 'components/common/CustomField/InputField';
import { authAction } from 'features/auth/authSlice';
import { signUpData } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
	.object({
		email: yup
			.string()
			.email('Must be a valid email')
			.max(255)
			.required('Email is required'),
		password: yup.string().max(255).required('Password is required'),
	})
	.required();
export interface SignUpPageProps {}
interface formState {
	username: string;
	email: string;
	password: string;
}
export default function SignUpPage(props: SignUpPageProps) {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});
	const dispatch = useAppDispatch();
	const onsubmit = (value: formState) => {
		const formValue: signUpData = {
			user: {
				username: value.username,
				email: value.email,
				password: value.password,
			},
		};
		dispatch(authAction.signUp(formValue));
	};
	return (
		<Container maxWidth={'lg'} sx={{ my: '50px' }}>
			<Paper
				elevation={5}
				sx={{
					maxWidth: '350px',
					padding: '20px',
					minHeight: '400px',
					textAlign: 'center',
					mx: 'auto',
				}}
			>
				<Lock color={'primary'} fontSize={'large'} />
				<Typography variant="h5" fontWeight={'700'}>
					Sign In
				</Typography>
				<form onSubmit={handleSubmit(onsubmit)}>
					<InputField
						control={control}
						name="username"
						type={'text'}
						label="Username"
					/>
					<InputField
						control={control}
						name="email"
						type={'email'}
						label="Email"
					/>

					<InputField
						control={control}
						name="password"
						type={'password'}
						label="Password"
					/>
					<Button
						sx={{ mt: '20px' }}
						fullWidth
						variant="contained"
						color="primary"
						type="submit"
					>
						Register
					</Button>

					<Typography sx={{ mt: '20px' }}>
						You have an account?{' '}
						<Link style={{ textDecoration: 'none' }} to={'#'}>
							Sign In
						</Link>
					</Typography>
				</form>
			</Paper>
		</Container>
	);
}
