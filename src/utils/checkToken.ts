export const checkToken = (): string => {
	const token = localStorage.getItem('access_token');
	return token ? token : '';
};
