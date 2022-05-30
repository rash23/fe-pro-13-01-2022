import { showLoader, hideLoader } from './loader.js';
import { getAllTodos, deleteTodoByIs, generateFetchError, setTodoById } from './helpers/main.js';
import { createTask, list, Task } from './creaters/creaters.js';

const form = document.forms.todo;
const input = form.task;

const errors = document.querySelector('.errors');
const clearBtn = document.querySelector('.clear-btn');

export const request = async (url, initRequest) => {
	const response = await fetch(url, initRequest);
	if (response.ok) {
		console.log(`Status: ${response.status}`);

		const contentType = response.headers.get('content-type');

		if (contentType?.includes('application/json')) {
			return await response.json();
		}
		return await response.text();
	}

	throw generateFetchError(response);
};

const renderTodoList = async (max) => {
	showLoader();
	const tasks = await getAllTodos();

	tasks.forEach((task) => {
		const { id } = task;
		if (task !== undefined && id <= max) {
			createTask(task);
		}
	});

	hideLoader();
};

renderTodoList(10);

let counter = 201;

form.addEventListener('submit', async (event) => {
	let obj;
	event.preventDefault();

	if (input.value === '') {
		errors.textContent = 'Please enter your task';
	} else {
		obj = Task('loading...', counter++);

		const task = createTask(obj);
		task.classList.add('skeleton');

		await setTodoById(obj);

		task.firstChild.textContent = input.value;
		task.classList.remove('skeleton');

		input.value = '';
	}

	errors.textContent = '';
});

list.addEventListener('click', ({ target }) => {
	if (target.classList.contains('list-item')) {
		target.classList.toggle('completed');
	}
});

clearBtn.addEventListener('click', async () => {
	let clone = list.cloneNode(true);

	while (clone.firstChild) {
		let id = clone.firstChild.getAttribute('num');

		clone.firstChild.classList.add('disabled');
		clone.firstChild.lastChild.disabled = true;

		await deleteTodoByIs(id);

		clone.removeChild(clone.firstChild);
	}

	list.replaceWith(clone);
});
