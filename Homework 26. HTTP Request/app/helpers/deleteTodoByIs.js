import { request } from '../index.js';

export const deleteTodoByIs = async (id) => {
	const delItem = await request(`https://jsonplaceholder.typicode.com/todos/${id}`, {
		method: 'DELETE',
	});
	return delItem;
};
