type JSONSuccessResponse<Data> = {
	status: number;
	data: Data;
};

type JSONFailedResponse = {
	status: number;
	message: string;
};

export const baseURL = "http://localhost:3030"

const baseHeaders = (() => {
	const headers = new Headers();

	headers.set("accept", "application/json");
	headers.set("content-type", "application/json");

	return headers;
})()

const request = (method: Request['method']) => {
	return async <Data = undefined>(resource: string, body?: unknown) => {

		const response = await fetch(`${baseURL}/${resource}`, {
			method,
			headers: baseHeaders,
			body: body ? JSON.stringify(body) : null,
		});

		if (response.ok) {
			const responseData:  JSONSuccessResponse<Data> | JSONFailedResponse  = await response.json();

			if ("message" in responseData) {
				throw new Error(responseData.message);
			}	

			return responseData.data;
		}

		throw new Error(response.statusText);
	};
};

export const get = request('get');
export const post = request('post');