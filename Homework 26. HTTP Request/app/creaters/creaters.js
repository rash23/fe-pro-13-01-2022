import { deleteTodoByIs } from '../helpers/deleteTodoByIs.js';

export const list = document.querySelector('.list');

export const createNewList = (attr) => {
	let li = document.createElement('li');
	li.classList.add('list-item');
	li.setAttribute('num', attr);

	return li;
};

export const createNewP = (value) => {
	let p = document.createElement('p');
	p.classList.add('text');
	p.textContent = value;

	return p;
};

export const createTask = (task) => {
	let { id, title, completed } = task;

	let crtTask = createNewList(id);
	let p = createNewP(title);

	if (completed) crtTask.classList.add('completed');

	let btn = createRemoveBtn();
	crtTask.append(p, btn);

	list.prepend(crtTask);

	return crtTask;
};

export const createRemoveBtn = () => {
	let btn = document.createElement('button');
	btn.classList.add('remove');
	btn.textContent = 'remove';

	btn.addEventListener('click', async () => {
		let id = btn.parentElement.getAttribute('num');
		btn.parentElement.classList.add('disabled');
		btn.disabled = true;
		await deleteTodoByIs(id);

		btn.parentElement.remove();
	});

	return btn;
};

export const Task = (text, id) => {
	return {
		userId: 11,
		id: id,
		title: text,
		completed: false,
	};
};
