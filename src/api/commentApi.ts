import { commentList, commentModel } from 'models/comment';
import axiosCustom from './axiosCustom';

export const commentApi = {
	addComment(commentData: commentModel, slug: string): Promise<commentModel> {
		const url = `/articles/${slug}/comments`;
		return axiosCustom.post(url, commentData);
	},
	getCommentByArticle(slug: string): Promise<commentList<commentModel>> {
		const url = `/articles/${slug}/comments`;
		return axiosCustom.get(url);
	},
	deleteComment(
		slug: string,
		id: string | number
	): Promise<commentList<commentModel>> {
		const url = `/articles/${slug}/comments/${id}`;
		return axiosCustom.delete(url);
	},
};
