import { loginData, signUpData, userModel } from 'models';
import axiosCustom from './axiosCustom';

export const authApi = {
	login(loginData: loginData): Promise<userModel> {
		const url = '/users/login';
		return axiosCustom.post(url, loginData);
	},
	signUp(signUpData: signUpData): Promise<userModel> {
		const url = '/users';
		return axiosCustom.post(url, signUpData);
	},
};
