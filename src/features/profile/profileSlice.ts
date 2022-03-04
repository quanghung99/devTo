import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { profileModel } from 'models';

interface profileState {
	isLoading?: boolean;
	currentProfile: profileModel;
}

const initialState: profileState = {
	isLoading: false,
	currentProfile: {
		profile: {
			username: '',
			image: '',
			bio: '',
			following: false,
		},
	},
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		fetchProfile(state, action: PayloadAction<string>) {
			state.isLoading = true;
		},
		fetchProfileSuccess(state, action: PayloadAction<profileModel>) {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		fetchProfileFailed(state, action) {
			state.isLoading = false;
		},
	},
});

const profileReducer = profileSlice.reducer;

export const profileActions = profileSlice.actions;
export const selectProfileLoading = (state: RootState) =>
	state.profile.isLoading;
export const selectProfileCurrent = (state: RootState) =>
	state.profile.currentProfile;

export default profileReducer;
