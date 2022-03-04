import { Lock } from '@mui/icons-material';
import { Button, Container, Paper, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import InputField from 'components/common/CustomField/InputField';
import { authAction } from 'features/auth/authSlice';
import { loginData } from 'models';
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

export interface LoginPageProps {}
interface formState {
	email: string;
	password: string;
}
export default function LoginPage(props: LoginPageProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});
	const dispatch = useAppDispatch();
	const onsubmit = (value: formState) => {
		const formLogin: loginData = {
			user: {
				email: value.email,
				password: value.password,
			},
		};
		dispatch(authAction.login(formLogin));
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
						Sign In
					</Button>

					<Typography sx={{ mt: '20px' }}>
						Don't have an account?{' '}
						<Link style={{ textDecoration: 'none' }} to={'#'}>
							Sign Up
						</Link>
					</Typography>
				</form>
			</Paper>
		</Container>
	);
}
