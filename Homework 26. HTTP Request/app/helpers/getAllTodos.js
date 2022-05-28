import { request } from '../index.js';

export const getAllTodos = async () => {
	const todos = await request('https://jsonplaceholder.typicode.com/todos');

	return todos;
};
