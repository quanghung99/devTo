import { PayloadAction } from '@reduxjs/toolkit';
import { authApi, updateUserData, userApi } from 'api';
import { AxiosError } from 'axios';
import { push } from 'connected-react-router';
import { loginData, signUpData, userModel } from 'models';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authAction } from './authSlice';

function* hanleLogin(action: PayloadAction<loginData>) {
	try {
		const res: userModel = yield call(authApi.login, action.payload);
		yield put(authAction.loginSuccess(res));
		toast.success('Login Success');
		yield put(push('/'));
		localStorage.setItem('access_token', res.user.token);
	} catch (error) {
		yield put(authAction.loginFaile());
		toast.error('Email or password incorrect');
	}
}
function* handleSignUp(action: PayloadAction<signUpData>) {
	try {
		const res: userModel = yield call(authApi.signUp, action.payload);
		yield put(authAction.loginSuccess(res));
		localStorage.setItem('access_token', res.user.token);
		yield put(push('/'));
		toast.success('Register success');
	} catch (error) {
		yield put(authAction.loginFaile());
		const err = error as AxiosError;
		if (err.response) {
			for (const property in err.response.data.errors) {
				toast.error(`${property}  ` + err.response.data.errors[property][0]);
			}
		}
	}
}
function* handleGetUserProfile() {
	try {
		const token = localStorage.getItem('access_token');
		console.log('Token:', token);
		if (token) {
			const res: userModel = yield call(userApi.getCurrentUser);
			yield put(authAction.loginSuccess(res));
		} else {
			yield put(authAction.loginFaile());
		}
	} catch (error) {
		yield put(authAction.loginFaile());
	}
}
function* handleChangeUserProfile(action: PayloadAction<updateUserData>) {
	try {
		const res: userModel = yield call(
			userApi.updateCurrentUser,
			action.payload
		);
		yield put(authAction.updateUserSuccess(res));
		toast.success('Update Success');
	} catch (error) {
		yield put(authAction.updateUserFail());
		const err = error as AxiosError;
		if (err.response) {
			console.log(err.response);
			toast.error(err.response.data);
		}
	}
}
export default function* authSaga() {
	yield takeLatest(authAction.login.type, hanleLogin);
	yield takeLatest(authAction.signUp.type, handleSignUp);
	yield takeLatest(authAction.getCurrentUser.type, handleGetUserProfile);
	yield takeLatest(authAction.updateUserProfile.type, handleChangeUserProfile);
}
