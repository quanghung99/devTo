import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
	articleFilter,
	articleModel,
	articlesResponse,
	tagModel,
} from 'models';

interface State {
	articles: articleModel[];
	filter: articleFilter;
	isLoading: boolean;
	error: string;
	tags: string[];
	totalCount: number;
}

const initialState: State = {
	articles: [],
	isLoading: true,
	error: '',
	filter: {
		limit: 0,
		offset: 0,
	},
	totalCount: 3,
	tags: [],
};

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		getListArticle: (state, action: PayloadAction<articleFilter>) => {
			state.isLoading = true;
		},
		setListArticle: (state, action: PayloadAction<articlesResponse>) => {
			state.articles = action.payload.articles;
			state.totalCount = action.payload.articlesCount;
			state.isLoading = false;
		},
		getTag: () => {},
		getTagSuccess: (state, action: PayloadAction<tagModel>) => {
			state.tags = action.payload.tags;
		},
		getListFeed: (state, action: PayloadAction<articleFilter>) => {
			state.isLoading = true;
		},
		changeFilter: (state, action: PayloadAction<articleFilter>) => {
			state.filter = action.payload;
			state.isLoading = true;
		},
	},
});

export const articleAction = articleSlice.actions;
export const selectArticleList = (state: RootState) => state.article.articles;
export const selectArticleFilter = (state: RootState) => state.article.filter;
export const selectArticleListByUser = createSelector(
	selectArticleList,
	(articleList) =>
		articleList.reduce((map: { [key: string]: articleModel }, article) => {
			map[article.author.username] = article;
			return map;
		}, {})
);
export const selectIsLoading = (state: RootState) => state.article.isLoading;
const articleReducer = articleSlice.reducer;
export default articleReducer;
