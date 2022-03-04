export interface articleModel {
	slug: string;
	title: string;
	description: string;
	body: string;
	createdAt: string;
	updatedAt: string;
	tagList: Array<string>;
	author: {
		username: string;
		bio: string;
		image: string;
		following: boolean;
	};
	favoritesCount: number;
	favorited: boolean;
}
export interface articlesResponse {
	articles: articleModel[];
	articlesCount: number;
}
export interface articleSlug {
	article: articleModel;
}
export interface articleList<T> {
	articles: Array<T>;
}

export interface articleParamCreate {
	article: {
		title: string;
		description: string;
		body: string;
		tagList?: Array<string>;
	};
}
export interface articleParamUpdate {
	article: {
		title?: string;
		description?: string;
		body?: string;
	};
}

export interface articleFilter {
	tag?: string;
	author?: string;
	favorited?: string;
	limit?: number;
	offset?: number;
}
