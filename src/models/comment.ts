import { profileModel } from './profile';

export interface commentModel {
	comment: {
		id?: string | number;
		createdAt?: string;
		updatedAt?: string;
		body: string;
		author: profileModel;
	};
}

export interface commentList<T> {
	comments: Array<T>;
}
