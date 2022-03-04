import { userModel } from 'models';
import axiosCustom from './axiosCustom';

export const userApi = {
	getCurrentUser(): Promise<userModel> {
		const url = 'user';
		return axiosCustom.get(url);
	},
	updateCurrentUser(updateUserData: updateUserData): Promise<userModel> {
		const url = 'user';
		return axiosCustom.put(url, updateUserData);
	},
};
export interface updateUserData {
	user: {
		email: string;
		bio: string;
		password: string;
		username: string;
		image: string;
	};
}
