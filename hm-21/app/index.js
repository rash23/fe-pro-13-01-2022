const form = document.forms.form;
const input = form.text;

const button = form.btn;
const list = document.querySelector('.list');
const dropzone = document.querySelector('.dropzone');

const createNewList = (value) => {
	let li = document.createElement('li');
	li.classList.add('list__item');
	li.textContent = value;
	li.draggable = true;
	return li;
};

const store = new Map();

const DragList = (list) => {
	Array.from(list.children).forEach((liItem) => {
		liItem.addEventListener('dragstart', (event) => {
			const { target: item, dataTransfer } = event;

			const flakeId = new Date().getTime().toString();

			store.set(flakeId, item);

			dataTransfer.setData('text/plain', flakeId);
		});

		liItem.addEventListener('dragend', (e) => {
			store.clear();
		});
	});
};

const Dropzone = (dropzone) => {
	['dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventType) => {
		dropzone.addEventListener(eventType, (e) => e.preventDefault(), false);
	});

	dropzone.addEventListener('drop', (e) => {
		const { target, dataTransfer } = e;
		if (target !== dropzone) return;
		const flakeId = dataTransfer.getData('text/plain');
		const item = store.get(flakeId);
		dropzone.append(item);
	});
};

const getNextElement = (cursorPosition, currentElement) => {
	const currentElementCoord = currentElement.getBoundingClientRect();
	const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
	const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;

	return nextElement;
};

const sortable = (item) => {
	item.addEventListener('dragstart', (event) => {
		event.target.classList.add('selected');
	});

	item.addEventListener('dragend', (event) => {
		event.target.classList.remove('selected');
	});

	item.addEventListener(`dragover`, (event) => {
		event.preventDefault();

		const activeElement = item.querySelector('.selected');
		const currentElement = event.target;
		const isMoveable = activeElement !== currentElement && currentElement.classList.contains('list__item');

		if (!isMoveable) {
			return;
		}

		const nextElement = getNextElement(event.clientY, currentElement);

		if ((nextElement && activeElement === nextElement.previousElementSibling) || activeElement === nextElement) {
			return;
		}
		if (activeElement !== null) {
			item.insertBefore(activeElement, nextElement);
		}
	});
};

form.addEventListener('submit', (event) => {
	let newLi = createNewList(input.value);
	list.append(newLi);
	DragList(list);
	input.value = '';

	event.preventDefault();
});

DragList(list);
Dropzone(dropzone);
Dropzone(list);
sortable(dropzone);
