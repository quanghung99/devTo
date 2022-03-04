export interface loginData {
	user: {
		email: string;
		password: string;
	};
}

export interface signUpData {
	user: {
		email: string;
		password: string;
		username: string;
	};
}

export interface userModel {
	user: {
		email: string;
		token: string;
		username: string;
		bio: string | null;
		image: string;
	};
}
