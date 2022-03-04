import { PayloadAction } from '@reduxjs/toolkit';
import { profilesApi } from 'api';
import { profileModel } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { profileActions } from './profileSlice';

function* fetchProfile(action: PayloadAction<string>) {
	try {
		const response: profileModel = yield call(
			profilesApi.getProfiles,
			action.payload
		);
		yield put(profileActions.fetchProfileSuccess(response));
	} catch (error) {
		console.log(error);
		yield put(profileActions.fetchProfileFailed);
	}
}
export default function* profileSaga() {
	yield takeLatest(profileActions.fetchProfile.type, fetchProfile);
}
