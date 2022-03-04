export interface filterParam {
	tag: string;
	author: string;
	favorited: string;
	limit: string;
	offset: string;
}

export interface Error_StatusCode {
	errors: {
		body: Array<string>;
	};
}
