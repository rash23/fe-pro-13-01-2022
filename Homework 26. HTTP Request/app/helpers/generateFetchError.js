export const generateFetchError = (response) => {
	const error = new Error('Request Failed');
	error.statusCode = response.status;
	error.statusMessage = response.statusText;

	return error;
};
