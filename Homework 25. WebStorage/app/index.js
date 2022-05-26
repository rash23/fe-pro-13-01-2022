class Store {
	getState(id) {
		const store = localStorage.getItem(id);

		if (!store) {
			const initStore = {};

			localStorage.setItem(id, JSON.stringify(initStore));
			return initStore;
		}

		return JSON.parse(store);
	}

	setState(id, entity) {
		const state = this.getState(id);

		localStorage.setItem(id, JSON.stringify({ ...state, [entity.id]: entity }));
	}
}

const getCookie = (name) => {
	const cookie = document.cookie;
	const pos = cookie.indexOf(name + '=');

	if (pos !== -1) {
		const start = pos + name.length + 1;
		let end = cookie.indexOf(';', start);

		if (end === -1) {
			end = cookie.length;
		}
		let value = cookie.substring(start, end);

		return value;
	}
};

const form = document.forms.todo;
const input = form.task;
const list = document.querySelector('.list');
const errors = document.querySelector('.errors');
let isDone = false;

const createNewList = () => {
	let li = document.createElement('li');
	li.classList.add('list-item');

	return li;
};

const createNewP = (value) => {
	let p = document.createElement('p');
	p.classList.add('text');
	p.textContent = value;

	return p;
};

const createRempveBtn = () => {
	let btn = document.createElement('button');
	btn.classList.add('remove');
	btn.textContent = 'remove';

	return btn;
};

const removeButton = (btn) => {
	btn.addEventListener('click', () => {
		btn.parentElement.remove();

		let obj = JSON.parse(localStorage.getItem(getCookie('USER_AUTH')));
		let parent = btn.parentElement.textContent;

		for (let [key, value] of Object.entries(obj)) {
			if (parent === value.text + 'remove') {
				delete obj[key];
				localStorage.setItem(getCookie('USER_AUTH'), JSON.stringify(obj));
			}
		}
	});
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (input.value === '') {
		errors.textContent = 'Please enter your task';
		return;
	}

	errors.textContent = '';
	let task = createNewList();
	let p = createNewP(input.value);
	let btn = createRempveBtn();
	task.append(p, btn);

	new Store().setState(getCookie('USER_AUTH'), { id: Date.now(), text: input.value });

	removeButton(btn);
	list.append(task);

	input.value = '';
});

const preLoadTodo = () => {
	let obj = JSON.parse(localStorage.getItem(getCookie('USER_AUTH')));

	if (obj !== null) {
		for (const item of Object.values(obj)) {
			let task = createNewList();
			let p = createNewP(item.text);
			let btn = createRempveBtn();
			task.append(p, btn);
			removeButton(btn);
			task.append(p, btn);
			list.append(task);
		}
	}
};

preLoadTodo();

const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', () => {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}

	localStorage.setItem(`${getCookie('USER_AUTH')}`, JSON.stringify({}));
});
