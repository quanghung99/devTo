import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Typography } from '@mui/material';
import { updateUserData, userApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import InputField from 'components/common/CustomField/InputField';
import TextAreaField from 'components/common/CustomField/TextAreaField';
import { authAction } from 'features/auth/authSlice';
import { userModel } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Corporation from '../../asset/SettingsIcon/corporation.png';
import CreditCard from '../../asset/SettingsIcon/credit-card.png';
import MailBox from '../../asset/SettingsIcon/mailbox.png';
import Plant from '../../asset/SettingsIcon/plant.png';
import SettingsIcon from '../../asset/SettingsIcon/settings.png';
import SmilingFace from '../../asset/SettingsIcon/smiling-face.png';
import Thunderbolt from '../../asset/SettingsIcon/thunderbolt.png';
import styles from './styles.module.scss';

const schema = yup.object({
	imgUrl: yup.string(),
	username: yup.string(),
	bio: yup.string(),
	email: yup.string(),
	password: yup.string(),
});

export interface ISettingsProps {}

export default function Settings(props: ISettingsProps) {
	const currentUser = useAppSelector((state) => state.auth.userState.user);
	const dispatch = useAppDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			imgUrl: currentUser.image,
			username: currentUser.username,
			bio: currentUser.bio || '',
			email: currentUser.email,
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const submitFormValue = (value: any) => {
		console.log(value);
		const submitValue: updateUserData = {
			user: {
				image: value.image,
				bio: value.bio,
				username: value.username,
				password: value.password,
				email: value.email,
			},
		};
		dispatch(authAction.updateUserProfile(submitValue));
	};
	return (
		<Container maxWidth="md" className={styles.settingSection}>
			<Typography variant="h4">
				Settings for <span>@{currentUser.username}</span>
			</Typography>
			<Grid
				container
				spacing={2}
				className={styles.settingSection__leftSidebar}
			>
				<Grid item md={3}>
					<ul>
						<li>
							<img src={SmilingFace} alt="" />
							Profile
						</li>
						<li>
							<img src={SettingsIcon} alt="" />
							Customization
						</li>
						<li>
							<img src={MailBox} alt="" />
							Notifications
						</li>
						<li>
							<img src={Plant} alt="" />
							Account
						</li>
						<li>
							<img src={CreditCard} alt="" />
							Billing
						</li>
						<li>
							<img src={Corporation} alt="" />
							Organization
						</li>
						<li>
							<img src={Thunderbolt} alt="" />
							Extensions
						</li>
					</ul>
				</Grid>
				<Grid item md={9}>
					<div className={styles.settingSection__connectBtn}>
						<Button>Connect Forem Account</Button>
						<Button>Connect Twitter Account</Button>
					</div>
					<form
						onSubmit={handleSubmit(submitFormValue)}
						action=""
						className={styles.settingSection__formSetting}
					>
						<Typography>User</Typography>
						<div>
							<label>Username</label>
							<InputField control={control} name="username" label={''} />
						</div>
						<div>
							<label>Email</label>
							<InputField control={control} name="email" label={''} />
						</div>
						<div>
							<label>Bio</label>
							<TextAreaField
								control={control}
								name="bio"
								type={'text'}
								label=""
								placeholder="Short bio about you"
							/>
						</div>
						<div>
							<label>Profile image</label>
							<div className={styles.settingSection__profilePic}>
								<img src={currentUser.image} alt={currentUser.username} />
								<InputField
									control={control}
									name="imgUrl"
									type={'text'}
									label={''}
								/>
							</div>
						</div>
						<div className={styles.settingSection__saveBtn}>
							<Button type="submit">Save Profile Information</Button>
						</div>
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}
