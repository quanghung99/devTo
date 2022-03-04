import {
	articleFilter,
	articleModel,
	articleParamCreate,
	articleParamUpdate,
	articleSlug,
	articlesResponse,
} from 'models/article';
import { tagModel } from 'models/tag';
import { stringify } from 'query-string';
import axiosCustom from './axiosCustom';

export const articlesApi = {
	getListArticles(filter: articleFilter): Promise<articlesResponse> {
		const filterString = stringify(filter);
		const url = `/articles?${filterString}`;
		return axiosCustom.get(url);
	},
	getFeedArticles(filter: articleFilter): Promise<articlesResponse> {
		const filterString = stringify(filter);
		const url = `/articles/feed?${filterString}`;
		return axiosCustom.get(url);
	},
	getArticle(slug: string): Promise<articleSlug> {
		const url = `/articles/${slug}`;
		return axiosCustom.get(url);
	},
	addArticle(articleData: articleParamCreate): Promise<articleModel> {
		const url = '/articles';
		return axiosCustom.post(url, articleData);
	},
	updateArticle(
		articleData: articleParamUpdate,
		slug: string
	): Promise<articleModel> {
		const url = `/articles/${slug}`;
		return axiosCustom.put(url, articleData);
	},
	deleteArticle(slug: string): Promise<articleModel> {
		const url = `/articles/${slug}`;
		return axiosCustom.delete(url);
	},
	favoriteArticle(slug: string): Promise<any> {
		const url = `/articles/${slug}/favorite`;
		return axiosCustom.post(url);
	},

	unfavoriteArticle(slug: string): Promise<any> {
		const url = `/articles/${slug}/favorite`;
		return axiosCustom.delete(url);
	},
	getTag(): Promise<tagModel> {
		const url = '/tags';
		return axiosCustom.get(url);
	},
};
