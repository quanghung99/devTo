import { PayloadAction } from '@reduxjs/toolkit';
import { articlesApi } from 'api';
import { articleFilter, articlesResponse, tagModel } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { articleAction } from './articleSlice';

function* fetchAllArticle(action: PayloadAction<articleFilter>) {
	try {
		const res: articlesResponse = yield call(
			articlesApi.getListArticles,
			action.payload
		);
		yield put(articleAction.setListArticle(res));
	} catch (error) {}
}
function* fetchArticleByFilter(action: PayloadAction<articleFilter>) {
	try {
		const res: articlesResponse = yield call(
			articlesApi.getListArticles,
			action.payload
		);
		yield put(articleAction.setListArticle(res));
	} catch (error) {}
}
function* fetchAllUserFeed(action: PayloadAction<articleFilter>) {
	try {
		const res: articlesResponse = yield call(
			articlesApi.getFeedArticles,
			action.payload
		);
		yield put(articleAction.setListArticle(res));
	} catch (error) {}
}
function* fetchTag() {
	try {
		const res: tagModel = yield articlesApi.getTag();
		yield put(articleAction.getTagSuccess(res));
	} catch (error) {}
}
export default function* articleSaga() {
	yield takeLatest(articleAction.getListArticle.type, fetchAllArticle);
	yield takeLatest(articleAction.getListFeed.type, fetchAllUserFeed);
	yield takeLatest(articleAction.changeFilter.type, fetchArticleByFilter);
	yield takeLatest(articleAction.getTag.type, fetchTag);
}
