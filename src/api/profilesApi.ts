import { userModel } from 'models';
import { profileModel } from 'models/profile';
import axiosCustom from './axiosCustom';

export const profilesApi = {
	getProfiles(username: string): Promise<profileModel> {
		const url = `/profiles/${username}`;
		return axiosCustom.get(url);
	},
	followUser(username: string): Promise<profileModel> {
		const url = `/profiles/${username}/follow`;
		return axiosCustom.post(url);
	},
	unfollowUser(username: string): Promise<profileModel> {
		const url = `/profiles/${username}/follow`;
		return axiosCustom.delete(url);
	},
};
