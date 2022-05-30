import { request } from '../index.js';

export const setTodoById = async (obj) => {
	const todos = await request(`https://jsonplaceholder.typicode.com/todos/`, {
		method: 'POST',
		body: JSON.stringify(obj),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	return todos;
};
