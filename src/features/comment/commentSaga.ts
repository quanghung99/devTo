import { PayloadAction } from '@reduxjs/toolkit';
import { commentApi } from 'api';
import { commentModel } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { commentActions } from './commentSlice';

function* getListComment(action: PayloadAction<string>) {
	const response: commentModel[] = yield call(
		commentApi.getCommentByArticle,
		action.payload
	);
	yield put(commentActions.setListComment(response));
}

function* addComment(action: PayloadAction<commentModel, string>) {
	const response: commentModel[] = yield call(
		commentApi.addComment,
		action.payload,
		''
	);
	yield put(commentActions.setListComment(response));
}

export default function* commentSaga() {
	yield takeLatest(commentActions.getListComment, getListComment);
	yield takeLatest(commentActions.addComment, addComment);
}
