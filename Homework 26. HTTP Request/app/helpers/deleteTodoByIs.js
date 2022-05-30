import { request } from '../index.js';

export let deleteTodoByIs = async (id) => {
	let delItem = await request(`https://jsonplaceholder.typicode.com/todos/${id}`, {
		method: 'DELETE',
	});
	return delItem;
};
